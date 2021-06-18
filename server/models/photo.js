const { Schema, model } = require('mongoose');

const photoSchema = new Schema({
    username: String,
    email: String,
    password: String,
});

const Photo = model('Photo', photoSchema);

module.exports = Photo;