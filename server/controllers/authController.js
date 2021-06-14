const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
     
    try {
        const { username, email, password } = req.body;
         console.log(password)
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
                        res.status(201).send(createdUser._id)
                    })
                    .catch((err) => console.log(err));
            };
        });
    } catch (err) {
        console.log(err);
    };

});
module.exports = router;


