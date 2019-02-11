const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
});

CommentSchema.pre('save', function(next) {
    let user = this;
    const options = [{path: 'author'}, {path: 'post'}];
    Comment.populate(user, options, function() {
        next();
    })
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment };