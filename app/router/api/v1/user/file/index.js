const router = require('express').Router();

//cotroller
const FileController = require('../../../../../http/controllers/api/v1/fileController/FileController');

//validator

router.get('/', FileController.getAllFiles)
router.get('/:id', FileController.getFileById)

module.exports = router;