import React from 'react';

const HomePage = () => {
    return (
        <section className="container" style={{
            marginTop: '10rem',
            textAlign: "center"
        }}>
            <h1>Welcome To Blog App</h1>
            <small className="text-muted">Created By Abhishek Baghel V1.0.0</small>
            <div>
                <button className="btn btn-outline-primary mr-1">Login</button>
                <button className="btn btn-outline-success ml-1">Signup</button>
            </div>
        </section>
    );
};

export default HomePage;