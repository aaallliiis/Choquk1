const { check } = require('express-validator');
const Validator =  require('./Validator');

class CourseValidator extends Validator{
  handle(){
    return [
      check('name', 'name cant be less than 4 char').trim().escape().isLength({min:4}),
      check('profId', 'profId cant be less than 4 char').trim().escape().isLength({min:4}),
      check('fieldId', 'fieldId cant empty').notEmpty(),
    ];
  }
}
module.exports = new CourseValidator();