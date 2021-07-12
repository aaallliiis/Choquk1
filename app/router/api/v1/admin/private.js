const router = require('express').Router();
const field = require('./field');
const course = require('./course');
const file = require('./file');
const prof = require('./prof');

router.use('/fields' ,field);
router.use('/courses' ,course);
router.use('/files' ,file);
router.use('/profs' ,prof);

module.exports = router;