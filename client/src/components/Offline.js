import React from 'react';

const Offline = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template">
                        <h1>
                            Oops!</h1>
                        <h2>
                            No Internet</h2>
                        <div className="error-details">
                            Sorry, an error has occured, You're Offline!
                </div>
                        <div className="error-actions">
                            <h2>Please Connect To Internet</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Offline;