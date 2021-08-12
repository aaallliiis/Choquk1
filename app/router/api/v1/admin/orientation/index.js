const router = require("express").Router();

//cotroller
const OrientationController = require("../../../../../http/controllers/api/v1/admin/OrientationController");

//validator
// const FieldValidator = require("../../../../../validators/FieldValidator");

router.get("/", OrientationController.getAllOrientations);
// router.post("/", FieldValidator.handle(), FieldController.createField);
// router.put("/:id", FieldValidator.handle(), FieldController.updateField);
// router.delete("/:id", FieldController.deleteField);

module.exports = router;
