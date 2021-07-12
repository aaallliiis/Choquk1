const router = require('express').Router();
const profile = require('./profile');
const field = require('./field');
const file = require('./file');
const prof = require('./prof');

router.use('/fields' ,field);
router.use('/files' ,file);
router.use('/profile' ,profile);
router.use('/prof' ,prof);

module.exports = router;