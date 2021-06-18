const upload = require('../middlewares/uploadImage');
const router = require('express').Router();
const gfs = require('../server');
const User = require('../models/user');
const { auth } = require('../middlewares/auth')




//add to user photos array in mongoDB
router.post('/photos', auth, (req, res) => {
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

router.get('/photos', auth, (req, res) => {
    const id = req.user._id;
    User.findOne({ _id: id }, (err, user) => {
        if (user) {
            res.send(user.photos)
        }
    })
});

router.post('/deletePhoto', auth, (req, res) => {
    const userId = req.user._id;
    const id = req.body.id;
    User.findOneAndUpdate({ _id: userId }, { $pull: { photos: { id: id } } }, (err, data) => {
        if (err) {
            res.send(err)
        } else {
            res.send(data);
        }
    });
})


//upload in gfs
router.post("/upload", upload.single('file'), (req, res) => {
    if (req.file === undefined) return res.send("You must select a file.");
    const imgUrl = `http://localhost:4000/file/${req.file.filename}`;
    return res.send(imgUrl);

});

router.delete("/file/:filename", async (req, res) => {
    try {
        await gfs.files.deleteOne({ filename: req.params.filename });
        res.send("success");
    } catch (error) {

        res.send("An error occured.");
    }
});


module.exports = router;