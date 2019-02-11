//THIRD PARTY MODULES
const router = require('express').Router();
const {
    isEmail
} = require('validator');
//CUSTOM FILES 
const {
    Post
} = require('./../model/Post');
const {
    User
} = require('./../model/User');
const { Comment } = require('./../model/Comment');
const setError = require('./../utils/setError');
const authenticate = require('./../middleware/authenticate');

//ROUTES

// POST - /users - SIGN UP A NEW USER
router.post('/', async (req, res) => {
    try {
        if (!req.body.name) {
            throw new Error("Name is Required");
        }
        if (!req.body.email) {
            throw new Error("Email is Required");
        } else if (!isEmail(req.body.email)) {
            throw new Error("Invalid Email");
        }
        if (!req.body.password || req.body.password.length < 6) {
            throw new Error("Password Required & Must Be atlease 6 chars");
        }

        const foundUser = await User.findOne({
            email: req.body.email
        });

        if (foundUser) {
            return res.status(400).json(setError("400", "Email Already Taken"));
        }

        const user = new User({
            ...req.body
        });

        const newUser = await user.save();
        const token = newUser.generateAuthToken();
        return res.header('Authorization', token).status(200).json({
            user: newUser,
            token
        });
    } catch (e) {
        return res.status(400).json(setError("400", e.message));
    }
});

//POST - /posts/login - LOGIN A USER
router.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
        throw new Error("Email is Required");
    } else if (!isEmail(email)) {
        throw new Error("Invalid Email");
    }
    if (!password) {
        throw new Error("Password is Required");
    }

    try {
        const foundUser = await User.findByCredentials(email, password);
        if (foundUser) {
            const token = await foundUser.generateAuthToken();
            res.header('Authorization', token).status(200).json({
                user: foundUser,
                token
            });
        }

    } catch (e) {
        return res.status(400).json(setError("400", e.message));
    }
});

//GET - /users/me - GET LOGGED IN USER
router.get('/me', authenticate, (req, res) => {
    const user = req.user;
    return res.json({
        me: user
    });
});

//EXPORT ROUTER
module.exports = router;