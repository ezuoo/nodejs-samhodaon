const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

fs.readdir('uploads', (error) => {
    // uploads 폴더 없으면 생성
    if (error) {
        fs.mkdirSync('uploads');
    }
})

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
})


/**
 *  각 API에 에러핸들링 해야함.
*/
router.post('', upload.single('file'), (req, res) => {    
    res.json({ url : req.file.filename});
})

router.get('/:filename', (req, res) => {
    const path = `uploads/${req.params.filename}`;
    
    fs.readFile(path, function (err, data) {
        res.send(data);
    }); 
});

/** DELETE
 * delete image file
 */
router.delete('/:filename', (req, res) => {
    const path = `uploads/${req.params.filename}`;

    fs.unlink(path, (err) => {
        if (err) res.json({ success : false , msg: 'Failed to delete'});
        res.json({ success : true , msg: 'deleted successfully'});
    });
});

module.exports = router;