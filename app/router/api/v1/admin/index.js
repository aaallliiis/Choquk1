const router = require('express').Router();

//  midlleware
const AdminAuthMiddleware = require('../../../../http/middleware/api/AdminAuthMiddleware');

const forAll = require('./public');
const forAdmin = require('./private');

router.use(forAll);

router.use(AdminAuthMiddleware.handle, forAdmin);

module.exports = router;
