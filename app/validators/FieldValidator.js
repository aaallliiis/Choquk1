const { check } = require('express-validator');
const Validator =  require('./Validator');

class FieldValidator extends Validator{
  handle(){
    return [
      check('name', 'نام نمیتواند کمتر از ۴ حرف باشد').trim().escape().isLength({min:4}),
    ];
  }
}
module.exports = new FieldValidator();