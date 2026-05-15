const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/uploadsController');
const multer = require('multer');

const storage = multer.diskStorage({ destination: (req,file,cb)=>cb(null,'./uploads/'), filename: (req,file,cb)=>cb(null,Date.now()+"-"+file.originalname) });
const upload = multer({ storage });

router.post('/', upload.single('file'), ctrl.upload);

module.exports = router;
