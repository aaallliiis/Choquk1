const router = require('express').Router();

//cotroller
const profileController = require('../../../../../http/controllers/api/v1/user/profileController/ProfileController');

//validator

router.get('/', profileController.getUserData)
router.put('/', profileController.updateUser)

module.exports = router;