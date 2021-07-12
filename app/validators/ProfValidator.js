const { check } = require('express-validator');
const Validator =  require('./Validator');

class CourseValidator extends Validator{
  handle(){
    return [
      check('name', 'نام نمیتواند کمتر از ۴ حرف باشد').trim().escape().isLength({min:4}),
    ];
  }
}
module.exports = new CourseValidator();