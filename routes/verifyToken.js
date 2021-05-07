const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const currentUser = User.findOne({_id: verified});
        req.user = currentUser;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}
