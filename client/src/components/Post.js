import React from 'react';
import { Link } from 'react-router-dom';

import truncate from './../utils/truncate';
import stripTags from './../utils/stripTags'

const Post = ({
    post,
    sn
}) => {
    return (
        <div className="card mb-2">
            <div className="card-header">{sn}. {truncate(post.title, 30)}</div>
            <div className="card-body">
                <p className="card-text">{truncate(stripTags(post.body))}</p>
                <Link className="btn btn-dark" to={`/posts/${post._id}`}>Show Post</Link>
                <hr/>
                <div className="chip">{post.author.name}</div>
            </div>
        </div>
    );
}

export default Post;