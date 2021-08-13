const mongoose = require("mongoose");
const idPlugin = require("./mongoPlugin");

const orientationSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    fieldId: { type: mongoose.Schema.Types.ObjectId, ref: "Field" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

orientationSchema.plugin(idPlugin);

orientationSchema.statics.getOrientations = async function (fieldId) {
  if (
    !(await mongoose.model("Field").findById(fieldId)) ||
    !mongoose.isValidObjectId(fieldId)
  )
    throw new Error("آیدی نامعتبر است");
  else return await Orientation.find({ fieldId }, "-__v -updatedAt");
};

orientationSchema.statics.getAllOrientations = async function () {
  return await Orientation.find({}, "-__v -updatedAt").populate("fieldId");
};

orientationSchema.statics.createOrientation = async function (body) {
  const found = await Orientation.findOne({ name: body.name });
  if (found) {
    throw new Error("نام تکراری میباشد");
  }
  if (
    !mongoose.isValidObjectId(body.fieldId) ||
    !(await mongoose.model("Field").findById(body.fieldId))
  )
    throw new Error("آیدی نامعتبر است");
  else {
    const newOrientation = new Orientation(body);
    await newOrientation.save();
    return "درس با موفقیت اضافه شد";
  }
};

orientationSchema.statics.updateOrientation = async function (body, id) {
  const found = await Orientation.findOne({ name: body.name });
  if (found && found.id !== id) {
    throw new Error("نام تکراری میباشد");
  }
  if (
    !mongoose.isValidObjectId(body.fieldId) ||
    !(await mongoose.model("Field").findById(body.fieldId)) ||
    !mongoose.isValidObjectId(id) ||
    !(await Orientation.findById(id))
  )
    throw new Error("آیدی نامعتبر است");
  else {
    await Orientation.findByIdAndUpdate(id, { $set: body });
    return "درس با موفقیت ویرایش شد";
  }
};

orientationSchema.statics.deleteOrientation = async function (id) {
  if (!mongoose.isValidObjectId(id) || !(await Orientation.findById(id)))
    throw new Error("آیدی نامعتبر است");
  else {
    await await Orientation.findByIdAndDelete(id);
    return "فایل با موفقیت حذف شد";
  }
};

const Orientation = mongoose.model("Orientation", orientationSchema);

module.exports = Orientation;
