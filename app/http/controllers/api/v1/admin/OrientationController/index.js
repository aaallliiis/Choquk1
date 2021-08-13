const controller = require("../../../../controller");
const Orientation = require("../../../../../../models/Orientation");

class OrientationController extends controller {
  async getAllOrientations(req, res, next) {
    return this.success(await Orientation.getAllOrientations(), res);
  }

  async createOrientation(req, res) {
    try {
      const errors = this.validationData(req);
      if (errors.length > 0) return this.failed(errors, res, 400);
      const { body } = req;
      const result = await Orientation.createOrientation(body);
      return this.success(result, res);
    } catch ({ message }) {
      return this.failed(message, res, 400);
    }
  }

  async updateOrientation(req, res) {
    try {
      const errors = this.validationData(req);
      if (errors.length > 0) return this.failed(errors, res, 400);
      const {
        body,
        params: { id },
      } = req;
      const result = await Orientation.updateOrientation(body, id);
      return this.success(result, res);
    } catch ({ message }) {
      return this.failed(message, res, 400);
    }
  }

  async deleteOrientation({ params: { id } }, res) {
    try {
      const result = await Orientation.deleteOrientation(id);
      return this.success(result, res);
    } catch ({ message }) {
      return this.failed(message, res, 400);
    }
  }
}

module.exports = new OrientationController();
