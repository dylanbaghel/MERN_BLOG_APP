import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { startLogout } from './../action/authActions';
import { history } from './../router/AppRouter';
import brand from './../gifs/favicon.png';

const Header = (props) => {
    const {isAuthenticated, startLogout} = props;
    const publicLinks = (
        <React.Fragment>
            <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/signup">Signup</Link>
            </li>
        </React.Fragment>
    );

    const privateLinks = (
        <React.Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/posts/add">Add Post</Link>
            </li>
            <li className="nav-item">
                <button className="btn btn-danger" onClick={() => {
                    startLogout();
                    history.replace('/');
                }}>Logout</button>
            </li>
        </React.Fragment>
    );

    return (
        <nav className="navbar navbar-dark bg-dark mb-5">
            <div className="container">
                <Link to="/" className="navbar-brand"><span><img src={brand} alt="logo"/></span> Blog App</Link>
                <div>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/posts" className="nav-link">Posts</Link>
                    </li>
                    {isAuthenticated ? privateLinks : publicLinks}
                </ul>
                </div>
            </div>
        </nav>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: !!state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startLogout: () => dispatch(startLogout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);