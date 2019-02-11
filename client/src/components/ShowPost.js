import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { startSetViewPost, startRemovePost, setViewPost } from './../action/postActions';
import getDateTime from './../utils/getDateTime';

import AddComment from './AddComment';
import Comments from './Comments';
import Loading from './Loading';
import NotFound from './NotFound';

class ShowPost extends React.Component {
    componentWillMount() {
        this.props.startSetViewPost(this.props.match.params.postId);
    }

    componentWillUnmount() {
        this.props.setViewPost(null);
    }

    deletePost(postId) {
        this.props.startRemovePost(postId);
        this.props.history.replace('/dashboard');
    }

    render() {
        const { post, loading, hasModifyWrite, isAuthenticated, match } = this.props;
        if (loading) {
            return <Loading />
        }
        if (!post) {
            setTimeout(() => {
                return <NotFound />
            }, 3000);
            return <Loading />
        }
        return (
            <div className="container">
                <div className="card card-body mb-4">
                    <h5 className="card-title">{post.title}</h5>
                    <small>{getDateTime(post.createdAt)}</small>
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: post.body }} />

                    {isAuthenticated && hasModifyWrite && <div>
                        <Link to={`/posts/edit/${post._id}`} className="btn btn-dark mr-1">Edit</Link>
                        <button onClick={this.deletePost.bind(this, post._id)} className="btn btn-danger ml-1">Delete</button>
                    </div>}
                </div>
                {
                    isAuthenticated && !hasModifyWrite && <AddComment />
                }
                {
                    !isAuthenticated && (
                        <div className="card card-body mb-3">
                            <h5 className="card-title">Add Comment</h5>
                            <p className="card-text">Please <Link to="/login">Login</Link> To Add Comment</p>
                        </div>
                    )
                }
                <Comments postId={match.params.postId} />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        post: state.posts.view,
        loading: state.loading,
        isAuthenticated: !!state.auth.userId,
        hasModifyWrite: state.posts.view && state.posts.view.author === state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startSetViewPost: (postId) => dispatch(startSetViewPost(postId)),
        startRemovePost: (postId) => dispatch(startRemovePost(postId)),
        setViewPost: (view) => dispatch(setViewPost(view))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);