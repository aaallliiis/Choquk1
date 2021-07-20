const router = require('express').Router();
const profile = require('./profile');
const field = require('./field');
const file = require('./file');
const prof = require('./prof');
const orientation = require('./orientation');

router.use('/fields' ,field);
router.use('/files' ,file);
router.use('/profile' ,profile);
router.use('/prof' ,prof);
router.use('/orientation' ,orientation);

module.exports = router;