require('dotenv').config();
const express = require('express');
const db = require('./dbConnection');
const cors = require('cors');
const routes = require('./routes');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const { auth } = require('./middlewares/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(auth);

let gfs;
db.on('err', () => console.log('connection error'));
db.once('open', () => {

    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection('photos');
    console.log('Database connected!');
});


const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = gfs;