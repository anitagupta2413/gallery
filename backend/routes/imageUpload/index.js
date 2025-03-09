const express = require('express');
const router = express.Router();
const userImage = require('../../controllers/imageUpload/index');

router.post('/upload' , userImage.imageUpload);


module.exports = router;