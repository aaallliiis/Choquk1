const router = require('express').Router();

//  midlleware
const AuthMiddleware = require('../../../../http/middleware/api/AuthMiddleware');

const forAll = require('./public');
const forUser = require('./private');

router.use(forAll);

router.use(AuthMiddleware.handle, forUser);

module.exports = router;
