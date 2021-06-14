const jwt = require('jsonwebtoken');
const { secretKey } = require('../controllers/authController')

function auth(req, res, next) {
    console.log('asdasdasd');
    const authorizatonHeader = req.get('Authorization');
    if (authorizatonHeader) {
        const token = authorizatonHeader.spli(' ')[1];

        try {
            const decoded = jwt.verify(token, secretKey);
            req.user = decoded;
        } catch (err) {
            return next();
        };
    };
    next();
};

function isAuth(req, res, next) {
    if (!req.user) {
        res.status(401).json({ message: 'You cannot perform this action!' });
    };
    next();
};

module.exports = {
    auth,
    isAuth
};