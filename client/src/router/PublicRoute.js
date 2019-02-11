import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return <Route 
        {...rest}
        render={(props) => {
            return (
                isAuthenticated ? <Redirect to="/dashboard" /> : <Component {...props} /> 
            );
        }}
    />
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.userId
    };
};

export default connect(mapStateToProps)(PublicRoute);