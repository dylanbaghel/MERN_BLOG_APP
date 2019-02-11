const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

UserSchema.methods.toJSON = function() {
    let user = this;
    let userObj = user.toObject();

    return {
        _id: userObj._id,
        name: userObj.name,
        email: userObj.email,
        createdAt: userObj.createdAt,
        
    };
}

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    const token = jwt.sign({
        userId: user._id.toHexString()
    }, process.env.JWT_SECRET, { expiresIn: 3600 });
    return token;
}

UserSchema.statics.findByCredentials = async function (email, password) {
    let User = this;

    try {
        const foundUser = await User.findOne({
            email
        });
        if (!foundUser) {
            throw new Error("Email is Not Registerd With Us");
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);
        if (!isMatch) {
            throw new Error("Incorrect Password");
        } else {
            return foundUser;
        }

    } catch (e) {
        throw new Error(e.message);
    }
}

UserSchema.statics.findByToken = async function (token) {
    let User = this;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foundUser = await User.findOne({
            _id: decoded.userId
        });

        if (foundUser) {
            return foundUser;
        } else {
            throw new Error('Authentication Required');
        }
    } catch (e) {
        throw new Error(e.message);
    }
};

UserSchema.pre('save', async function (next) {
    let user = this;
    if (user.isModified('password')) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = {
    User
};