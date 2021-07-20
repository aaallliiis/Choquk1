const { check } = require('express-validator');
const Validator =  require('./Validator');

class CourseValidator extends Validator{
  handle(){
    return [
      check('name', 'نام نمیتواند کمتر از ۴ حرف باشد').trim().escape().isLength({min:4}),
      check('profId', 'استاد نمیتواند خالی باشد').trim().escape().notEmpty(),
      check('fieldId', 'رشته نمیتواند خالی باشد').notEmpty(),
    ];
  }
}
module.exports = new CourseValidator();