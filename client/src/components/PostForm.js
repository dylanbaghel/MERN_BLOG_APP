import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import Switch from 'react-switch';
import classNames from 'classnames';

class PostForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.post ? props.post.title : '',
            body: props.post ? props.post.body : '',
            published: props.post ? props.post.published : false,
            errors: {}
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.hanldePublishedChange = this.hanldePublishedChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleTitleChange(e) {
        const title = e.target.value;
        this.setState(() => ({
            title
        }));
    }

    handleBodyChange(text) {
        this.setState(() => ({
            body: text
        }));
    }

    hanldePublishedChange(checked) {
        this.setState(() => ({
            published: checked
        }));
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.state.title) {
            this.setState(() => ({
                errors: { title: "Title is Required" }
            }));
            return;
        }
        if (!this.state.body) {
            this.setState(() => ({
                errors: { body: "Body is Required" }
            }));
            return;
        }

        this.props.handleSubmit({
            title: this.state.title,
            body: this.state.body,
            published: this.state.published.toString()
        });
    }

    render() {
        return (
            <div className="card card-body">
                <h5 className="card-title">Add Post</h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            value={this.state.title}
                            className={classNames('form-control', {
                                'is-invalid': this.state.errors.title
                            })}
                            placeholder="Enter Title..."
                            onChange={this.handleTitleChange}
                        />
                        <div className="invalid-feedback">{this.state.errors.title}</div>
                    </div>
                    <div className="form-group">
                        <ReactQuill
                            value={this.state.body}
                            onChange={this.handleBodyChange}
                            placeholder="Enter Body"
                            theme="snow"
                            className={classNames({
                                'is-invalid': this.state.errors.body
                            })}
                            scrollingContainer={"true"}
                        />
                        <div className="invalid-feedback">{this.state.errors.body}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="normal-switch">
                            <Switch
                                onChange={this.hanldePublishedChange}
                                checked={this.state.published}
                                id="normal-switch"
                            />
                        </label>
                    </div>
                    <button className="btn btn-dark">Submit</button>
                </form>
            </div>
        );
    }
}

export default PostForm;