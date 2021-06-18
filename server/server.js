require('dotenv').config();
const express = require('express');
const connection = require('./dbConnection');
const cors = require('cors');
const routes = require('./routes');
const Grid = require('gridfs-stream');
const mongoose = require('mongoose');
const { auth } = require('./middlewares/auth');
const upload = require('./middlewares/uploadImage');
const User = require('./models/user');
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.get("/user", auth, (req, res) => {
    res.send(req.user);
    id = req.user._id;
});

connection();

let gfs;

//get photo
app.get("/file/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});

const conn = mongoose.connection;

conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});



const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = gfs;