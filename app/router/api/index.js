const router = require('express').Router();
const apiv1 = require('./v1')

router.use('/api/v1' , apiv1);

module.exports = router;