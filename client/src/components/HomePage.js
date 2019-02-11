import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <section className="container" style={{
            marginTop: '10rem',
            textAlign: "center"
        }}>
            <h1>Welcome To Blog App</h1>
            <small className="text-muted">Created By Abhishek Baghel V1.0.0</small>
            <div>
                <Link to="/login" className="btn btn-outline-primary mr-1">Login</Link>
                <Link to="/signup" className="btn btn-outline-success ml-1">Signup</Link>
            </div>
        </section>
    );
};

export default HomePage;