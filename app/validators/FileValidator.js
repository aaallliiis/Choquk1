const { check } = require('express-validator');
const Validator =  require('./Validator');

class FileValidator extends Validator{
  handle(){
    return [
      check('title', 'title cant be empty').trim().escape().notEmpty(),
      check('description', 'description cant empty').trim().escape().notEmpty(),
      check('fieldId', 'fieldId cant empty').notEmpty(),
      check('courseId', 'courseId cant empty').notEmpty(),
      check('type').custom(async value=>{
        if(!value||!['PDF','DOC','VID','IMG','VC'].includes(value))
          throw new Error ('invalid type')
      }),
      check('file','file cant be empty').notEmpty(),
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
module.exports = new FileValidator();