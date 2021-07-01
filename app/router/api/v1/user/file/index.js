const router = require('express').Router();

//cotroller
const FileController = require('../../../../../http/controllers/api/v1/fileController/FileController');

//validator

router.post('/', FileController.getAllFiles)
router.get('/:id', FileController.getFileById)

module.exports = router;