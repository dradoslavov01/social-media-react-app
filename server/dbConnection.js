const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dani:dani123@social-media.n75vi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

const db = mongoose.connection;

module.exports = db;