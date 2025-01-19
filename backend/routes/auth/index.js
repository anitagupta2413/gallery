const express = require('express');
const router = express.Router();
const userAuth = require('../../controllers/auth/index');

router.post('/signup' , userAuth.userSignup);
router.post('/login' , userAuth.userLogin);

module.exports = router;