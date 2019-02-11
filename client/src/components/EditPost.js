import React from 'react';
import { connect } from 'react-redux';

import { startSetViewPost, setViewPost, startEditPost } from './../action/postActions';

import PostForm from './PostForm';
import UnAuthorized from './UnAuthorized';
import NotFound from './NotFound';
import Loading from './Loading';

class EditPost extends React.Component {
    componentWillMount() {
        this.props.startSetViewPost(this.props.match.params.postId);
    }

    componentWillUnmount() {
        this.props.setViewPost(null);
    }

    render() {
        const { post, loading, startEditPost, history, userId } = this.props;
        if (loading) {
            return <Loading />;
        }
        if (!post) {
            return <NotFound />;
        }
        if (post.author !== userId) {
            return <UnAuthorized />;
        }
        return (
            <div className="container">
                <PostForm 
                    post={post}
                    handleSubmit={(data) => {
                        startEditPost(post._id, data);
                        history.replace(`/post/${post._id}`);
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.posts.view,
        userId: state.auth.userId,
        loading: state.loading
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