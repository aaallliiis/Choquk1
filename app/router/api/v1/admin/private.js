const router = require('express').Router();
const field = require('./field');
const course = require('./course');
const file = require('./file');

router.use('/fields' ,field);
router.use('/courses' ,course);
router.use('/files' ,file);

module.exports = router;