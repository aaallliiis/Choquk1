const router = require('express').Router();

//cotroller
const AuthController = require('../../../../http/controllers/api/v1/admin/AuthController');


// login
router.post('/login' ,AuthController.login);

module.exports = router;