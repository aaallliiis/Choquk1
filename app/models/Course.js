const mongoose = require("mongoose");
const File = require("./File");
const idPlugin = require("./mongoPlugin");

const courseSchema = mongoose.Schema(
  {
    name: { type: String, default: null },
    profId: { type: mongoose.Schema.Types.ObjectId, ref: "Prof" },
    fieldId: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
  },
  { timestamps: true }
);

courseSchema.statics.createCourse = async function (body) {
  const found = await Course.findOne({ name: body.name });
  if (found) {
    throw new Error("نام تکراری میباشد");
  }
  if (
    !mongoose.isValidObjectId(body.fieldId) ||
    !(await mongoose.model("Field").findById(body.fieldId)) ||
    !mongoose.isValidObjectId(body.profId) ||
    !(await mongoose.model("Prof").findById(body.profId))
  )
    throw new Error("آیدی نامعتبر است");
  else {
    const newCourse = new Course(body);
    await newCourse.save();
    return "درس با موفقیت اضافه شد";
  }
};

courseSchema.statics.updateCourse = async function (body, id) {
  const found = await Course.findOne({ name: body.name });
  if (found) {
    throw new Error("نام تکراری میباشد");
  }
  if (
    !mongoose.isValidObjectId(body.fieldId) ||
    !(await mongoose.model("Field").findById(body.fieldId)) ||
    !mongoose.isValidObjectId(body.profId) ||
    !(await mongoose.model("Prof").findById(body.profId)) ||
    !mongoose.isValidObjectId(id) ||
    !(await Course.findById(id))
  )
    throw new Error("آیدی نامعتبر است");
  else {
    await Course.findByIdAndUpdate(id, { $set: body });
    return "درس با موفقیت ویرایش شد";
  }
};

courseSchema.statics.deleteCourse = async function (id) {
  if (!mongoose.isValidObjectId(id) || !(await Course.findById(id)))
    throw new Error("آیدی نامعتبر است");
  else {
    await File.deleteMany({ courseId: found });
    await found.deleteOne();
    return "درس با موفقیت حذف شد";
  }
};

courseSchema.plugin(idPlugin);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
