import React from 'react';
import { connect } from 'react-redux';

import { startSetViewPost, setViewPost, startEditPost } from './../action/postActions';

import PostForm from './PostForm';
import UnAuthorized from './UnAuthorized';

class EditPost extends React.Component {
    componentDidMount() {
        this.props.startSetViewPost(this.props.match.params.postId);
    }

    componentWillUnmount() {
        this.props.setViewPost(null);
    }

    render() {
        const { post, startEditPost, history, userId } = this.props;
        if (!post) {
            return <div>404 Post Not Found</div>
        }
        if (post.author !== userId) {
            return <UnAuthorized />
        }
        return (
            <div className="container">
                <PostForm 
                    post={post}
                    handleSubmit={(data) => {
                        console.log(data);
                        startEditPost(post._id, data);
                        history.replace(`/posts/${post._id}`);
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.posts.view,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startSetViewPost: (postId) => dispatch(startSetViewPost(postId)),
        setViewPost: (view) => dispatch(setViewPost(view)),
        startEditPost: (postId, data) => dispatch(startEditPost(postId, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);