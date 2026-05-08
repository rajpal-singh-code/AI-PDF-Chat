const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const { token} = req.cookies || {};
        if(!token) return res.status(401).send("Please login to access this resource");

        const decodobj = jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = decodobj;

        const user = await User.findById(_id);
        if(!user) throw new Error("User not found");

        req.user = user;
        req.userId = user._id;
        next();
    } catch (error) {
        res.status(401).send("Invalid token"+ error.message);
    }
}

module.exports = authMiddleware;



