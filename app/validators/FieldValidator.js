const { check } = require('express-validator');
const Validator =  require('./Validator');

class FieldValidator extends Validator{
  handle(){
    return [
      check('name', 'name cant be less than 4 char').trim().escape().isLength({min:4}),
    ];
  }
}
module.exports = new FieldValidator();