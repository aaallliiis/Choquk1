const controller = require("../../../../controller");
const Prof = require("../../../../../../models/Prof");

class ProfController extends controller {
  async getAllProfs(req, res) {
    try {
      return this.success(await Prof.getProfs(), res);
    } catch ({ message }) {
      return this.failed(message, res, 400);
    }
  }

  async getProfById({ params: { id } }, res) {
    try {
      return this.success(await Prof.getProfData(id), res);
    } catch ({ message }) {
      return this.failed(message, res, 400);
    }
  }
}

module.exports = new ProfController();
