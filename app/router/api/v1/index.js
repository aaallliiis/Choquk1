const router = require('express').Router();

const user = require('./user');
const admin = require('./admin');

router.use('/admin', admin);
router.use('/', user);

module.exports = router;
