import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { connect } from 'react-redux';

import Header from './../components/Header';
import HomePage from './../components/HomePage';
import Posts from './../components/Posts';
import Login from './../components/Login';
import SignUp from './../components/SignUp';
import Dashboard from './../components/Dashboard';
import Alert from '../components/Alert';
import ShowPost from './../components/ShowPost';
import EditPost from './../components/EditPost';
import NotFound from './../components/NotFound';

import PrivateRoute from './../router/PrivateRoute';
import PublicRoute from './../router/PublicRoute';
import AddPost from '../components/AddPost';

export const history = createHistory();

const AppRouter = () => {
    return (
        <Router
            history={history}
        >
            <div>
                <Header />
                <Alert />
                <Switch>
                    <PublicRoute
                        exact path="/"
                        component={HomePage}
                    />
                    <PrivateRoute
                        exact path="/dashboard"
                        component={Dashboard}
                    />
                    <Route
                        exact path="/posts"
                        component={Posts}
                    />
                    <PrivateRoute
                        exact path="/posts/add"
                        component={AddPost}
                    />
                    <PrivateRoute
                        exact path="/posts/edit/:postId"
                        component={EditPost}
                    />
                    <Route
                        exact path="/post/:postId"
                        component={ShowPost}
                    />
                    <PublicRoute
                        exact path="/login"
                        component={Login}
                    />
                    <PublicRoute
                        exact path="/signup"
                        component={SignUp}
                    />
                    <Route 
                        component={NotFound}
                    />
                </Switch>
            </div>
        </Router>
    );
};

export default connect()(AppRouter);