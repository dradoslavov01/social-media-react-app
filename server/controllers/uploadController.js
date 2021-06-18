const upload = require('../middlewares/uploadImage');
const router = require('express').Router();
const gfs = require('../server');
const User = require('../models/user');
const { auth } = require('../middlewares/auth')

