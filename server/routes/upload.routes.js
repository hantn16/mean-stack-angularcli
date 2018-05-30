const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const Loki = require('lokijs');
const fs = require('fs');
const {authenticate}  = require('../middleware/authenticate');
const {upload,db} = require('../configs/multer.config');

const loadCollection = function (colName, db) {
    return new Promise(resolve => {
        db.loadDatabase({}, () => {
            const _collection = db.getCollection(colName) || db.addCollection(colName);
            resolve(_collection);
        })
    });
}

router.post('/profile', upload.single('avatar'), (req, res) => {
    loadCollection('images', db).then((collection) => {
        const data = collection.insert(req.file);
        db.saveDatabase();
        res.send({ id: data.$loki, fileName: data.filename, originalName: data.originalname });
    }).catch((e) => { res.sendStatus(400).send(e); });
})
module.exports = router;
