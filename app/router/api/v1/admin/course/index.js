const router = require('express').Router();

//cotroller
const CourseController = require('../../../../../http/controllers/api/v1/admin/CourseController');

//validator
const CourseValidator = require('../../../../../validators/CourseValidator');

router.get('/', CourseController.getAllCourses)
router.get('/:id', CourseController.getCourseById)
router.post('/',CourseValidator.handle(), CourseController.createCourse)
router.put('/:id',CourseValidator.handle(), CourseController.updateCourse)
router.delete('/:id', CourseController.deleteCourse)

module.exports = router;