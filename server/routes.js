const route = require('express').Router();

const authController  = require('./controllers/authController');
const uploadController = require('./controllers/uploadController');

route.use(authController);
// route.use("/file", uploadController);

module.exports = route;