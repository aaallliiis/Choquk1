const { check } = require("express-validator");
const Validator = require("./Validator");

class FieldValidator extends Validator {
  handle() {
    return [
      check("name", "نام نمیتواند کمتر از ۲ حرف باشد")
        .trim()
        .escape()
        .isLength({ min: 2 }),
    ];
  }
}
module.exports = new FieldValidator();
