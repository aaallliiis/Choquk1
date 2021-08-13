const controller = require("../../../../controller");
const File = require("../../../../../../models/File");

class FileController extends controller {
  async getAllFiles(
    { body: { offset, search, courseId, fieldId, profId, type } },
    res
  ) {
    try {
      if (offset % 10 === 0) {
        const files = await File.getFiles({
          search,
          courseId,
          fieldId,
          profId,
          type,
        });
        return this.success(
          files.filter((item, index) => offset - 10 <= index && index < offset),
          res
        );
      } else throw new Error("شماره نامعتبر است");
    } catch (error) {
      this.failed(error.message, res, 400);
    }
  }

  async getFileById({ params: { id } }, res) {
    try {
      return this.success(await File.getFileData(id), res);
    } catch (error) {
      this.failed(error.message, res, 400);
    }
  }
}

module.exports = new FileController();
