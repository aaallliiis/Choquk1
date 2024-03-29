const mongoose = require("mongoose");
const idPlugin = require("./mongoPlugin");

const fileShcema = mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    fieldId: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    url: { type: String, require: true },
    type: { type: String, require: true },
  },
  { timestamps: true }
);

fileShcema.statics.getFiles = async function ({
  search,
  courseId,
  fieldId,
  profId,
  type,
}) {
  let query = [];
  let founds = [];

  if (search)
    query = [
      { title: new RegExp(search, "gi") },
      { description: new RegExp(search, "gi") },
    ];

  if (fieldId && fieldId.length > 0) query.push({ fieldId: { $in: fieldId } });

  if (type && type.length > 0) query.push({ type: { $in: type } });

  if (courseId && courseId.length > 0)
    query.push({ courseId: { $in: courseId } });

  if (query.length > 0)
    founds = await File.find({ $or: query }, "-__v -updatedAt")
      .populate({
        path: "courseId",
        select: "name",
        populate: [{ path: "profId", select: "name", model: "Prof" }],
      })
      .populate("fieldId", "_id name");
  else
    founds = await File.find({}, "-__v -updatedAt")
      .populate({
        path: "courseId",
        select: "name",
        populate: [{ path: "profId", select: "name", model: "Prof" }],
      })
      .populate("fieldId", "_id name");

  if (profId && profId.length > 0) {
    try {
      for (const item in profId) {
        if (
          !(
            mongoose.isValidObjectId(profId[item]) &&
            (await mongoose.model("Prof").findById(profId[item]))
          )
        )
          throw new Error("آیدی نامعتبر است");
      }
      const all = await File.find({}, "-__v -updatedAt")
        .populate({
          path: "courseId",
          select: "name",
          populate: [{ path: "profId", select: "name", model: "Prof" }],
        })
        .populate("fieldId", "_id name");
      const allFilteredByProf = all.filter(
        ({
          courseId: {
            profId: { _id },
          },
        }) => profId.includes(_id.toString())
      );
      if (query.length > 0) {
        founds.push(...allFilteredByProf);
        return founds;
      } else return allFilteredByProf;
    } catch (err) {
      throw err;
    }
  } else return founds;
};

fileShcema.plugin(idPlugin);

fileShcema.statics.getFileData = async function (Id) {
  if (!mongoose.isValidObjectId(Id)) throw new Error("آیدی نامعتبر است");
  else
    return await File.findById(Id, "-__v -updatedAt")
      .populate("courseId", "_id name")
      .populate("fieldId", "_id name");
};

fileShcema.statics.createFile = async function (body) {
  if (
    !(await mongoose.model("Field").findById(body.fieldId)) ||
    !(await mongoose.model("Course").findById(body.courseId)) ||
    !mongoose.isValidObjectId(body.fieldId) ||
    !mongoose.isValidObjectId(body.courseId)
  )
    throw new Error("آیدی نامعتبر است");
  else {
    const newFile = new File(body);
    await newFile.save();
    return "فایل با موفقیت اضافه شد";
  }
};

fileShcema.statics.deleteFile = async function (id) {
  if (!mongoose.isValidObjectId(id) || !(await File.findById(id)))
    throw new Error("آیدی نامعتبر است");
  else {
    await await File.findById(id).deleteOne();
    return "فایل با موفقیت حذف شد";
  }
};

const File = mongoose.model("File", fileShcema);

module.exports = File;
