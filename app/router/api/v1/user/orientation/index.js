const router = require('express').Router();

//cotroller
const OrientationController = require('../../../../../http/controllers/api/v1/user/orientationController/OrientationController');

//validator

router.get('/:id', OrientationController.getAllOrientations)

module.exports = router;