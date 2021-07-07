const router = require('express').Router();
const field = require('./field');
const course = require('./course');

router.use('/fields' ,field);
router.use('/courses' ,course);

module.exports = router;