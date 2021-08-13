const router = require("express").Router();

//cotroller
const profileController = require("../../../../../http/controllers/api/v1/user/profileController/ProfileController");

//validator
const ProfileValidator = require("../../../../../validators/ProfileValidator");

router.get("/", profileController.getUserData);
router.put("/", ProfileValidator.handle(), profileController.updateUser);

module.exports = router;
