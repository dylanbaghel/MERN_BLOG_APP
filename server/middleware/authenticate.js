const jwt = require('jsonwebtoken');
const setError = require('./../utils/setError');
const {
    User
} = require('./../model/User');

const authenticate = async (req, res, next) => {
    try {
        const header = req.headers.authorization;
        console.log(header);
        if (!header) {
            throw new Error("Authentication Required");
        }

        const token = header.replace('Bearer ', '');

        const foundUser = await User.findByToken(token);
        if (!foundUser) {
            throw new Error("Authentication Required");
        }

        req.user = foundUser;
        next();
    } catch(e) {
        return res.status(401).json(setError("401", e.message));
    }
};

module.exports = authenticate;