const router = require('express').Router();

//cotroller
const ProfController = require('../../../../../http/controllers/api/v1/admin/ProfController');

//validator
const ProfValidator = require('../../../../../validators/ProfValidator');

router.get('/', ProfController.getAllProfs)
router.get('/:id', ProfController.getProfById)
router.post('/',ProfValidator.handle(), ProfController.createProf)
router.put('/:id',ProfValidator.handle(), ProfController.updateProf)
router.delete('/:id', ProfController.deleteProf)

module.exports = router;