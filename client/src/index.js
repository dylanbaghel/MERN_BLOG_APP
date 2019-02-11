import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import moment from 'moment';

import configureStore from './store/configureStore';
import { setCurrentUser, removeCurrentUser, startGetProfile } from './action/authActions';
import getUser from './utils/getUser';
import setAuthToken from './utils/setAuthToken';

const store = configureStore();
let jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);

// store.dispatch(startSetPosts());

if (localStorage.getItem('blogToken')) {
    const token = localStorage.getItem('blogToken');
    const user = getUser(token);
    const now = moment().unix();
    if (moment(now).isBefore(user.exp)) {
        const userId = user.userId;
        setAuthToken(token);
        store.dispatch(setCurrentUser({ userId }));
        store.dispatch(startGetProfile());
    } else {
        localStorage.removeItem('blogToken');
        setAuthToken(false);
        store.dispatch(removeCurrentUser());
    }
} else {
    store.dispatch(removeCurrentUser());
    setAuthToken(false);
}

ReactDOM.render(jsx, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
