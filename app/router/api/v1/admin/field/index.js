const router = require('express').Router();

//cotroller
const FieldController = require('../../../../../http/controllers/api/v1/admin/FieldController');

//validator
const FieldValidator = require('../../../../../validators/FieldValidator');

router.get('/', FieldController.getAllFields)
router.get('/:id', FieldController.getFieldById)
router.post('/',FieldValidator.handle(), FieldController.createField)
router.put('/:id',FieldValidator.handle(), FieldController.updateField)

module.exports = router;