import React from 'react';
import { connect } from 'react-redux';

import PostForm from './PostForm';
import { startAddPost } from './../action/postActions';

const AddPost = ({
    startAddPost,
    history
}) => {
    return (
        <div className="container">
            <PostForm handleSubmit={(data) => {
                startAddPost(data);
                history.replace('/dashboard');
            }} />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAddPost: (data) => dispatch(startAddPost(data))
    };
};

export default connect(undefined, mapDispatchToProps)(AddPost);