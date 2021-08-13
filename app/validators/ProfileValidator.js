const { check } = require("express-validator");
const Validator = require("./Validator");

class RegisterValidator extends Validator {
  handle() {
    return [
      check("name", "نام نمیتواند خالی باشد").trim().escape().notEmpty(),
      check("lastName", "نام خانوادگی نمیتواند خالی باشد")
        .trim()
        .escape()
        .notEmpty(),
      check("email", "ایمیل نمیتواند خالی باشد").trim().escape().notEmpty(),
      check("uniCode", "کد دانشجویی نمیتواند خالی باشد")
        .trim()
        .escape()
        .notEmpty(),
      check("orientation", "گرایش نمیتواند خالی باشد")
        .trim()
        .escape()
        .notEmpty(),
      check("field", "رشته نمیتواند خالی باشد").trim().escape().notEmpty(),
      check("birthDate", "تاریخ تولد نمیتواند خالی باشد")
        .trim()
        .escape()
        .notEmpty(),
    ];
  }
}
module.exports = new RegisterValidator();
