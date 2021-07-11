const { check } = require('express-validator');
const Validator =  require('./Validator');

class RegisterValidator extends Validator{
  handle(){
    return [
      check('name', 'name cant empty').trim().escape().notEmpty(),
      check('lastName', 'lastName cant empty').trim().escape().notEmpty(),
      check('email', 'title cant be empty').trim().escape().notEmpty(),
      check('uniCode', 'uniCode cant empty').trim().escape().notEmpty(),
      check('orientation', 'orientation cant empty').trim().escape().notEmpty(),
      check('field', 'field cant empty').trim().escape().notEmpty(),
      check('birthDate', 'birthDate cant empty').trim().escape().notEmpty(),
    ];
  }
  handleUpdate(){
    return [
      check('type').custom(async value=>{
        if(!value)
          return;
        if(!['PDF','DOC','VID','IMG','VC'].includes(value))
          throw new Error ('invalid type')
      }),
    ];
  }
}
module.exports = new RegisterValidator();