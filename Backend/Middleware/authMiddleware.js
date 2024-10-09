const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // استخدام المتغير البيئي
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized' });
        }
    } else {
        res.status(401).json({ message: 'No token, authorization denied' });
    }
};

exports.admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Admin access only' });
    }
};

exports.authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // استخراج التوكن من الهيدر

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // استخدام المتغير البيئي
        req.user = await User.findById(decoded.id); // تحميل بيانات المستخدم
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};