const express = require('express');
const router = express.Router();
const userAuth = require('../../controllers/auth/index');

router.post('/signup' , userAuth.userSignup);
router.post('/login' , userAuth.userLogin);
router.get('/get-user' , userAuth.userVerification);
router.post('/user-logout' , userAuth.userLogout);
router.delete('/delete-user' , userAuth.userDelete);


module.exports = router;