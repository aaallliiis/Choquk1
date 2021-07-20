const { check } = require('express-validator');
const Validator =  require('./Validator');

class FileValidator extends Validator{
  handle(){
    return [
      check('title', 'عنوان نمیتواند خالی باشد').trim().escape().notEmpty(),
      check('description', 'توضیحات نمیتواند خالی باشد').trim().escape().notEmpty(),
      check('fieldId', 'رشته نمیتواند خالی باشد').notEmpty(),
      check('courseId', 'درس نمیتواند خالی باشد').notEmpty(),
      check('type').custom(async value=>{
        if(!value||!['PDF','DOC','VID','IMG','VC'].includes(value))
          throw new Error ('نوع فایل نامعتبر است')
      }),
      check('file','فایل نمیتواند خالی باشد').notEmpty(),
    ];
  }
  handleUpdate(){
    return [
      check('type').custom(async value=>{
        if(!value)
          return;
        if(!['PDF','DOC','VID','IMG','VC'].includes(value))
          throw new Error ('نوع فایل نامعتبر است')
      }),
    ];
  }
}
module.exports = new FileValidator();