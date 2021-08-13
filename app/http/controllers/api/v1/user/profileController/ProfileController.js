const controller = require("../../../../controller");
const User = require("../../../../../../models/User");

class ProfileController extends controller {
  async getUserData(req, res, next) {
    return this.success(await User.getUserData(req.user.id), res);
  }

  async updateUser(req, res) {
    const errors = this.validationData(req);
    if (errors.length > 0) return this.failed(errors, res, 400);
    const {
      user: { id },
      body,
    } = req;
    const { phoneNumber, email, uniCode } = body;
    if (phoneNumber || email || uniCode) {
      var found = await User.find({
        $or: [{ email }, { phoneNumber }, { uniCode }],
      });
      if (found.length > 0 && found.find((item) => item.id !== id))
        return this.failed(
          "این ایمل یا شماره همراه یا کد دانشجویی قبلا ثبت شده است",
          res
        );
    }
    delete body.active;

    User.findByIdAndUpdate(id, { $set: body })
      .then(() => this.success("با موفقیت ویرایش شد", res))
      .catch((err) => console.log(err));
  }
}

module.exports = new ProfileController();
