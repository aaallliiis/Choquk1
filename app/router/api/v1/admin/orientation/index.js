const router = require("express").Router();

//cotroller
const OrientationController = require("../../../../../http/controllers/api/v1/admin/OrientationController");

//validator
const OrientationValidator = require("../../../../../validators/OrientationValidator");

router.get("/", OrientationController.getAllOrientations);
router.post(
  "/",
  OrientationValidator.handle(),
  OrientationController.createOrientation
);
router.put(
  "/:id",
  OrientationValidator.handle(),
  OrientationController.updateOrientation
);
router.delete("/:id", OrientationController.deleteOrientation);

module.exports = router;
