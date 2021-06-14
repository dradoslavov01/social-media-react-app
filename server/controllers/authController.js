const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {

    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPass = await bcrypt.hash(password, salt);

        User.findOne({ email }).then((user) => {
            if (user) {
                res.send('bad');
            } else {
                const newUser = new User({
                    username,
                    email,
                    password: hashedPass,
                });
                newUser.save()
                    .then(createdUser => {
                        res.status(201).send(createdUser._id);
                    })
                    .catch((err) => console.log(err));
            };
        });
    } catch (err) {
        console.log(err);
    };

});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password, function (err, response) {
                if (response) {
                    const authToken = jwt.sign({
                        _id: user._id,
                        username: user.username,
                    }, '662sadd82312cc99810sa0a88b');

                    res.status(200).json({ authToken });

                } else {
                    res.send('pass');
                };
            });
        } else {
            res.send('email');
        };
    });
});

module.exports = router;


