const router = require('express').Router();

//cotroller
const ProfController = require('../../../../../http/controllers/api/v1/user/ProfController');

router.get('/', ProfController.getAllProfs)
router.get('/:id', ProfController.getProfById)

module.exports = router;