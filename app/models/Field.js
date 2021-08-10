const mongoose = require("mongoose");
const idPlugin = require("./mongoPlugin");

const fieldSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

fieldSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "fieldId",
});

fieldSchema.statics.getFields = async function () {
  return await Field.find({}, "-__v -updatedAt").populate(
    "courses",
    "-__v -updatedAt"
  );
};

fieldSchema.statics.getFieldData = async function (Id) {
  if (!mongoose.isValidObjectId(Id)) throw new Error("آیدی نامعتبر است");
  else
    return await Field.findById(Id, "-__v -updatedAt").populate(
      "courses",
      "-__v -updatedAt"
    );
};

fieldSchema.statics.updateField = async function (body, id) {
  const found = await Field.findOne({ name: body.name });
  if (found) {
    throw new Error("نام تکراری میباشد");
  }
  if (!mongoose.isValidObjectId(id) || !(await Field.findById(id)))
    throw new Error("آیدی نامعتبر است");
  else {
    await Field.findByIdAndUpdate(id, { $set: body });
    return "رشته با موفقیت ویرایش شد";
  }
};

fieldSchema.statics.deleteField = async function (id) {
  if (!mongoose.isValidObjectId(id) || !(await Field.findById(id)))
    throw new Error("آیدی نامعتبر است");
  else {
    await mongoose.model("Course").deleteMany({ fieldId: found });
    await found.deleteOne();
    return "رشته با موفقیت حذف شد";
  }
};

fieldSchema.plugin(idPlugin);

const Field = mongoose.model("Field", fieldSchema);

module.exports = Field;
