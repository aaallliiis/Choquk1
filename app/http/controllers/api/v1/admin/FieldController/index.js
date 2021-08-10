const controller = require("../../../../controller");
const Field = require("../../../../../../models/Field");

class FiieldController extends controller {
  async getAllFields(req, res) {
    return this.success(await Field.getFields(), res);
  }

  async getFieldById({ params: { id } }, res) {
    return this.success(await Field.getFieldData(id), res);
  }

  async createField(req, res) {
    const errors = this.validationData(req);
    if (errors.length > 0) return this.failed(errors, res, 400);
    const { body } = req;
    const found = await Field.findOne(body);
    if (found) {
      return this.failed("نام تکراری میباشد", res, 400);
    }
    const newField = new Field(body);
    await newField.save();
    return this.success("رشته با موفقیت اضافه شد", res);
  }

  async updateField(req, res) {
    try {
      const errors = this.validationData(req);
      if (errors.length > 0) return this.failed(errors, res, 400);
      const {
        body,
        params: { id },
      } = req;
      const result = await Field.updateField(body, id);
      return this.success(result, res);
    } catch ({ message }) {
      return this.failed(message, res, 400);
    }
  }

  async deleteField({ params: { id } }, res) {
    try {
      const result = await Field.deleteField(id);
      return this.success(result, res);
    } catch ({ message }) {
      return this.failed(message, res, 400);
    }
  }
}

module.exports = new FiieldController();
