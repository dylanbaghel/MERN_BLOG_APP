import React from 'react';
import { Link } from 'react-router-dom';

const UnAuthorized = () => {
    return (
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="error-template">
                        <h1>
                            Oops!</h1>
                        <h2>
                            UnAuthorized</h2>
                        <div class="error-details">
                            You're Not The Person Who Created This Post
                </div>
                        <div class="error-actions">
                            <Link to="/" class="btn btn-primary btn-lg">Take Me Home </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default UnAuthorized;