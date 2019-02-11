import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux'; 

import { startAddComment } from './../action/commentActions';

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null
        };
        this.addComment = this.addComment.bind(this);
    }

    addComment() {
        const text = this.refs.commentText.value;
        if (!text) {
            this.setState(() => ({
                error: "Text is Required"
            }));
            return;
        }
        this.props.startAddComment(this.props.view._id, {text});
        console.log(text);
        this.refs.commentText.value = '';
        this.setState(() => ({
            error: null
        }));
    }

    render() {
        return (
            <div className="card card-body mb-3">
                <h5 className="card-title">Add Comment</h5>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Comment...."
                        ref="commentText"
                        className={classNames('form-control', {
                            'is-invalid': this.state.error
                        })}
                    />
                    <div className="invalid-feedback">{this.state.error}</div>
                </div>
                <button onClick={this.addComment} className="btn btn-dark">Add Comment</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        view: state.posts.view
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        startAddComment: (postId, data) => dispatch(startAddComment(postId, data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);