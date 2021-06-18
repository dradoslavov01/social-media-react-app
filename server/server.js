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

const conn = mongoose.connection;

conn.once("open", function () {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection("photos");
});


// media routes
app.post("/file/upload", upload.single('file'), (req, res) => {
    if (req.file === undefined) return res.send("You must select a file.");

    const imgUrl = `http://localhost:4000/file/${req.file.filename}`;
    return res.send(imgUrl);

});

app.get('/photos', auth, (req, res) => {
    const id = req.user._id;
    User.findOne({ _id: id }, (user, err) => {
        if (err) {
            res.send(err.photos)
        }
    })
})
app.post('/images', auth, (req, res) => {
    const id = req.user._id;
    const newId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
    const photo = {
        id: newId,
        url: req.body.url
    }
    User.findOneAndUpdate({ _id: id }, { $push: { photos: photo } }, (done, err) => {
        if (done) {
            res.send('uploaded successfully')
        } else {
            res.send('Error in uploading');
        }
    })
})

app.post('/deletePhoto', auth, (req, res) => {
    const userId = req.user._id;
    const id = req.body.id;
    console.log(id);
    User.findOneAndUpdate({ _id: userId }, { $pull: { photos: { id: id} } }, (err, data) =>{
        if(err){
            res.send(err)
        }else{
            res.send(data);
        }
    });
})


app.get("/file/:filename", async (req, res) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gfs.createReadStream(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send("not found");
    }
});

app.delete("/file/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {

        res.send("An error occured.");
    }
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));

module.exports = gfs;