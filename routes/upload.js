/* eslint-disable prefer-destructuring */
const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: async function (req, file, callback) {
        callback(null, 'botFile.json');
    }
});

const upload = multer({ storage: storage })


module.exports = (app, db) => {

    router.get('/', async (req, res) => {
       
        res.render('uploads', {});
    });

    router.post('/', upload.any(), (req, res) => {
        res.send('OK');
    });

    app.use('/uploads', router);
};
