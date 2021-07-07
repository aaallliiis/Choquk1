const router = require('express').Router();
const field = require('./field');

router.use('/fields' ,field);

module.exports = router;