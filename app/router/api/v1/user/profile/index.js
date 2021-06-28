const router = require('express').Router();

//cotroller
const profileController = require('../../../../../http/controllers/api/v1/profileController/ProfileController');

router.get('/', profileController.getUserData)

module.exports = router;