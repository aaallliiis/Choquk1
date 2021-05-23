const router = require('express').Router();

//cotroller
const AuthController = require('../../../../http/controllers/api/v1/auth/AuthController');
const ActiveAccountController = require('../../../../http/controllers/api/v1/auth/ActiveAccountController');


// login
router.post('/login' ,AuthController.login);

// register
router.post('/signup' ,AuthController.register);

// verification
router.post('/sendVerificationCode' ,ActiveAccountController.sendToken);
router.post('/verification', ActiveAccountController.activeMobile)

module.exports = router;