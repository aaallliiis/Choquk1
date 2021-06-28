const router = require('express').Router();
const profile = require('./profile');
const field = require('./field');

router.use('/field' ,field);
router.use('/profile' ,profile);

module.exports = router;