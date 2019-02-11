import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (<Route 
        {...rest}
        render={(props) => {
            return (
                isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
            );
        }}
    />);
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.userId
    };
};

export default connect(mapStateToProps)(PrivateRoute);