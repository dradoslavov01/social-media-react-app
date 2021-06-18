const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const authorizatonHeader = req.get('Authorization');
    if (authorizatonHeader) {
        const token = authorizatonHeader.split(' ')[1];
        if(token === null) {
            res.status(401).send('Error');
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decoded;
        } catch (err) {
            console.log('unAuthorized');
            return next();
        };
    };
    next();
};


module.exports = {
    auth
};