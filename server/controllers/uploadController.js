const upload = require('../middlewares/uploadImage');
const router = require('express').Router();
const Grid = require('gridfs-stream');
const gfs = require('../server')

router.post("/upload", upload.single("file"), (req, res) => {
    if(req.file === undefined) return res.send("You must select a file.");
    const imgUrl = `http://localhost:4000/file/${req.file.filename}`;
    return res.send(imgUrl);
});

router.get('/file/:filename', async (req, res) => {
    try {
        const file = await gfs.files.findOne({filename: req.params.file})
        const readStream = gfs.createReadStrema(file.filename);
        readStream.pipe(res);
    } catch (error) {
        res.send('Not found.')
    }
})

router.delete('/file/:filename', async (req, res) => {
    try {
        await gfs.files.deleteOne({filename: req.params.filename});
        res.send('success');
    } catch (error) {
        console.log('delete');
        res.send('Cannot delete img.');
    }
})

module.exports = router;