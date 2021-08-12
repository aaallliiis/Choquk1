const controller = require("../../../../controller");
const Course = require("../../../../../../models/Course");

class CourseController extends controller {
  async getAllCourses(req, res) {
    return this.success(await Course.getCourses(), res);
  }

  async getCourseById({ params: { id } }, res) {
    return this.success(await Course.getCourseData(id), res);
  }

  async createCourse(req, res) {
    try {
      const errors = this.validationData(req);
      if (errors.length > 0) return this.failed(errors, res, 400);
      const { body } = req;
      const result = await Course.createCourse(body);
      return this.success(result, res);
    } catch ({ message }) {
      return this.failed(message, res, 400);
    }
  }

  async updateCourse(req, res) {
    try {
      const errors = this.validationData(req);
      if (errors.length > 0) return this.failed(errors, res, 400);
      const {
        body,
        params: { id },
      } = req;
      const result = await Course.updateCourse(body, id);
      return this.success(result, res);
    } catch ({ message }) {
      return this.failed(message, res, 400);
    }
  }

  async deleteCourse({ params: { id } }, res) {
    try {
      const result = await Course.deleteCourse(id);
      return this.success(result, res);
    } catch ({ message }) {
      return this.failed(message, res, 400);
    }
  }
}

module.exports = new CourseController();
