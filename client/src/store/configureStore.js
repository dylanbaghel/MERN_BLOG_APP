import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import postReducer from './../reducer/postReducer';
import authReducer from './../reducer/authReducer';
import flashReducer from './../reducer/flashReducer';
import loadingReducer from './../reducer/loadingReducer';
import commentReducer from './../reducer/commentReducer';

export default () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(combineReducers({
        posts: postReducer,
        auth: authReducer,
        flash: flashReducer,
        loading: loadingReducer,
        comments: commentReducer
    }), composeEnhancers(
        applyMiddleware(thunk)
    ));

    return store;
};