const router = require('express').Router();

//cotroller
const AuthController = require('../../../../http/controllers/api/v1/user/auth/AuthController');
const ActiveAccountController = require('../../../../http/controllers/api/v1/user/auth/ActiveAccountController');

// Validator
const RegisterValidator = require('../../../../validators/RegisterValidator');

// login
router.post('/login' ,AuthController.login);

// register
router.post('/signup' ,RegisterValidator.handle(),AuthController.register);

// verification
router.post('/sendVerificationCode' ,ActiveAccountController.sendToken);
router.post('/verification', ActiveAccountController.activeMobile)

module.exports = router;