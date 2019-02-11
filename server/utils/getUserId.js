const jwt = require('jsonwebtoken');

const getUserId = (req) => {
    const header = req.headers.authorization;

    if (!header) {
        return null;
    }

    const token = header.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded.userId;
    } catch(e) {
        return null;
    }
};

module.exports = getUserId;