import React from 'react';
import preloader from './../gifs/heart.gif';

const Loading = () => {
    return (
        <div className="preloader">
            <img src={preloader} alt="Loading....."/>
            <div>
                <h5>Loading......</h5>
            </div>
        </div>
    );
};

export default Loading;