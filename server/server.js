require('dotenv').config();
const express = require('express');
const db = require('./dbConnection');
const cors = require('cors');
const routes = require('./routes');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const { auth } = require('./middlewares/auth');
const upload = require('./middlewares/uploadImage');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/user", auth, (req, res, next) => {
    res.send(req.user);
});


let gfs;
let ready = false;
db.on('err', () => console.log('connection error'));
db.once('open', () => {
   
    gfs = Grid(db.db, mongoose.mongo);
    gfs.collection('photos');
    ready = true;
    console.log('Database connected!');
});

app.get('/file/:filename', async (req, res) => {
    if(ready){
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send('Not found.');
    }
}
});


const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = gfs;