//THIRD PARTY MODULES
const router = require('express').Router();
const { isMongoId } = require('validator');
//CUSTOM FILES 
const { Post } = require('./../model/Post');
const { Comment } = require('./../model/Comment');
const setError = require('./../utils/setError');
const authenticate = require('./../middleware/authenticate');
const getUserId = require('./../utils/getUserId');
const paginateQuery = require('./../utils/paginate');
//ROUTES

//POST - /posts - CREATE A NEW POST
router.post('/', authenticate, async (req, res) => {
    if (!req.body.title) {
        return res.status(400).json(setError("400", "Title is Required"));
    }
    if (!req.body.body) {
        return res.status(400).json(setError("400", "Body is Required"));
    }

    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        published: req.body.published,
        author: req.user._id
    });

    const newPost = await post.save();
    if (newPost) {
        req.user.posts = [...req.user.posts, newPost._id];
        await req.user.save();
    }
    return res.status(200).json({ newPost });
});

//GET - /posts - GET ALL PUBLISHED POSTS
router.get('/', async (req, res) => {
    const pageNo = parseInt(req.query.pageNo);
    const size = parseInt(req.query.size);

    try {
        const query = paginateQuery(pageNo, size);
        const count = await Post.countDocuments({
            published: true
        });
        const posts = await Post.find({
            published: true
        }, null, query).sort({ createdAt: -1 }).populate('author');

        const totalPages = Math.ceil(count / size);

        return res.status(200).json({ count, pages: totalPages, posts });
    } catch(e) {
        return res.status(400).json(setError("400", e.message));       
    }
});

//GET - /posts/my - GET ALL POSTS FOR AUTHENTICATED USER
router.get('/my', authenticate, async (req, res) => {
    const pageNo = parseInt(req.query.pageNo);
    const size = parseInt(req.query.size);

    try {
        const query = paginateQuery(pageNo, size);
        const count = await Post.countDocuments({
            author: req.user._id
        });
        const myPosts = await Post.find({
            author: req.user._id
        }, null, query).sort({ createdAt: -1 });

        const totalPages = Math.ceil(count / size);

        return res.status(200).json({ count, pages: totalPages, myPosts });
    } catch(e) {
        return res.status(400).json(setError("400", e.message));
    }
});

//GET - /posts/:postId - GET A PARTICULAR POST
router.get('/:postId', async (req, res) => {
    const userId = getUserId(req);
    
    try {
        if (!isMongoId(req.params.postId)) {
            throw new Error("Invalid Post ID")
        }
        const posts = await Post.find({
            _id: req.params.postId,
            $or: [{
                published: true
            }, {
                author: userId
            }]
        });    
        if (posts.length === 0) {
            return res.status(404).json(setError("404", "Post Not Found"));
        } 
        return res.status(200).json({ post: posts[0] });
    } catch(e) {
        return res.status(400).json(setError("400", e.message));
    }
});

//EDIT - /posts/:postId - EDIT A PARTICULAR POST
router.put('/:postId', authenticate,  async (req, res) => {
    try {
        if (!isMongoId(req.params.postId)) {
            throw new Error("Invalid Post ID");
        }

        const updateObj = {};
        if (req.body.title) {
            updateObj.title = req.body.title;
        }
        if (req.body.body) {
            updateObj.body = req.body.body;
        }
        if (req.body.published) {
            updateObj.published = req.body.published;
        }

        const isPublished = await Post.findOne({
            _id: req.params.postId,
            published: true
        });

        if (isPublished && req.body.published === 'false') {
            await Comment.deleteMany({
                post: req.params.postId
            });
        }

        const updatedPost = await Post.findOneAndUpdate({
            _id: req.params.postId,
            author: req.user._id
        }, updateObj, { new: true });

        if (!updatedPost) {
            return res.status(404).json(setError("404", "Post Not Found"));
        }

        return res.status(200).json({ updatedPost });
    } catch(e) {
        return res.status(400).json(setError("400", e.message));
    }
});

//DELETE - /posts/:postId - DELETE INDI POST
router.delete('/:postId', authenticate, async (req, res) => {
    try {
        if (!isMongoId(req.params.postId)) {
            throw new Error("Invalid Post ID");
        }

        const deletedPost = await Post.findOneAndDelete({
            _id: req.params.postId,
            author: req.user._id
        });

        if (deletedPost) {
            await Comment.deleteMany({
                post: deletedPost._id
            });
            return res.status(200).json({ deletedPost });
        } else {
            return res.status(404).json(setError("404", "Post Not Found"));
        }

    } catch(e) {
        return res.status(400).json(setError("400", e.message));
    }
});

//EXPORT ROUTER
module.exports = router;