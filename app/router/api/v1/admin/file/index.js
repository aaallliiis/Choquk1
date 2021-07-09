const router = require('express').Router();

//cotroller
const FileController = require('../../../../../http/controllers/api/v1/admin/FileController');

//validator
const FileValidator = require('../../../../../validators/FileValidator');

// Middleware
const uploadMiddleware = require('../../../../../http/middleware/api/uploadMiddleware');


router.get('/', FileController.getAllFiles)
router.get('/:id', FileController.getFileById)
router.post(
    '/',
    uploadMiddleware.upload(config.filePath).single('file'),
    uploadMiddleware.handleFiles,
    FileValidator.handle(),
    FileController.createFile
)
router.put(
    '/:id',
    uploadMiddleware.upload(config.filePath).single('file'),
    uploadMiddleware.handleFiles,
    FileValidator.handleUpdate(),
    FileController.updateFile
)
router.delete('/:id', FileController.deleteFile)

module.exports = router;