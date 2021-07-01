const router = require('express').Router();
const profile = require('./profile');
const field = require('./field');
const file = require('./file');

router.use('/fields' ,field);
router.use('/files' ,file);
router.use('/profile' ,profile);

module.exports = router;