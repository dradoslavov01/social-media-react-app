const route = require('express').Router();

const authController  = require('./controllers/authController');
const photosController = require('./controllers/photosController');

route.use(authController);
route.use(photosController);

module.exports = route;