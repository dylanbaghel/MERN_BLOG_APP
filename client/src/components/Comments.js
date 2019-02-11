import React from 'react'
import { connect } from 'react-redux';

import { startSetComments, startRemoveComment } from './../action/commentActions';
import getPostsComments from './../selector/getPostsComments';
import getDateTime from './../utils/getDateTime';

import Loading from './Loading';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }
    componentDidMount() {
        this.props.startSetComments().then(data => {
            this.setState({
                loading: false
            })
        });
    }

    deleteComment(commentId) {
        this.props.startRemoveComment(commentId);
    }

    render() {
        const { comments, userId } = this.props;
        if (this.state.loading) {
            return <Loading />
        }
        return <div className="card card-body mb-4">
            <h5 className="card-title">Comments</h5>
            {
                comments.length > 0 ? (
                    comments.map(comment => {
                        return (
                            <div key={comment._id} className="list-group-item list-group-action">
                                <div className="d-flex w-100 justify-content-between">
                                    <h5 className="mb-1">{comment.text}</h5>
                                    {(userId === comment.author._id) && <small onClick={() => {
                                        this.deleteComment(comment._id);
                                    }} style={{ cursor: 'pointer' }}>X</small>}
                                </div>
                                <p className="mb-1">{comment.author.name}</p>
                                <small className="text-muted">{getDateTime(comment.createdAt)}</small>
                            </div>
                        );
                    })
                ) : (
                        <p>No comments</p>
                    )
            }
        </div>
    }
}

const mapStateToProps = (state, props) => {
    return {
        comments: getPostsComments(state.comments, props.postId),
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startSetComments: () => dispatch(startSetComments()),
        startRemoveComment: (commentId) => dispatch(startRemoveComment(commentId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
