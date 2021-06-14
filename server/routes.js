const route = require('express').Router();

const { router } = require('./controllers/authController')

route.use(router);

module.exports = route;