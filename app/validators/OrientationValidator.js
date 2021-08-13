const { check } = require("express-validator");
const Validator = require("./Validator");

class OrientationValidator extends Validator {
  handle() {
    return [
      check("name", "نام نمیتواند کمتر از ۳ حرف باشد")
        .trim()
        .escape()
        .isLength({ min: 3 }),
      check("fieldId", "رشته نمیتواند خالی باشد").notEmpty(),
    ];
  }
}
module.exports = new OrientationValidator();
