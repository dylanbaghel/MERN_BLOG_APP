//THIRD PARTY MODULES
const router = require('express').Router();
const {
    isMongoId
} = require('validator');
//CUSTOM FILES 
const {
    Post
} = require('./../model/Post');
const {
    Comment
} = require('./../model//Comment');
const setError = require('./../utils/setError');
const authenticate = require('./../middleware/authenticate');
const getUserId = require('./../utils/getUserId');

//ROUTES
//POST - /comments/:postId - CREATE A NEW COMMENT
router.post('/:postId', authenticate, async (req, res) => {
    try {
        if (!isMongoId(req.params.postId)) {
            throw new Error("Invalid Post ID");
        }

        if (!req.body.text) {
            throw new Error("Text is Required");
        }

        const post = await Post.findOne({
            _id: req.params.postId,
            published: true
        });

        if (!post) {
            return res.status(404).json(setError("404", "Post Not Found"));
        }

        const comment = new Comment({
            text: req.body.text,
            author: req.user._id,
            post: post._id
        });

        const newComment = await comment.save();

        return res.status(200).json({
            newComment
        });
    } catch(e) {
        return res.status(400).json(setError("400", e.message));
    }
});

//GET - /comments - GET ALL COMMENTS
router.get('/', async (req, res) => {
    try {
        const comments = await Comment
                                .find()
                                .sort( { createdAt: -1 } )
                                .populate('author')
                                .populate('post');

        return res.status(200).json({ comments });
    } catch(e) {
        return res.status(400).json(setError("400", e.message));
    }
});

//DELETE - /comments/:commentId - DELETING A COMMENT
router.delete('/:commentId', authenticate, async (req, res) => {
    try {
        if (!isMongoId(req.params.commentId)) {
            throw new Error("Invalid Comment ID");
        }
    
        const deletedComment = await Comment.findOneAndDelete({
            _id: req.params.commentId,
            author: req.user._id
        });
    
        if (!deletedComment) {
            return res.status(404).json(setError("404", "Comment Not Found"));
        }
    
        return res.status(200).json({ deletedComment });
    } catch(e) {
        return res.status(400).json(setError("400", e.message));
    }
});


//EXPORT ROUTER
module.exports = router;