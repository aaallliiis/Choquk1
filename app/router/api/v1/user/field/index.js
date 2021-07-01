const router = require('express').Router();

//cotroller
const FieldController = require('../../../../../http/controllers/api/v1/user/fieldController/FieldController');

//validator

router.get('/', FieldController.getAllFields)
router.get('/:id', FieldController.getFieldById)

module.exports = router;