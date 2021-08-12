const controller = require("../../../../controller");
const Orientation = require("../../../../../../models/Orientation");

class OrientationController extends controller {
  async getAllOrientations(req, res, next) {
    return this.success(await Orientation.getAllOrientations(), res);
  }
}

module.exports = new OrientationController();
