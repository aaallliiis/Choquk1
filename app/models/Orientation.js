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
  return await Orientation.find({}, "-__v -updatedAt");
};

const Orientation = mongoose.model("Orientation", orientationSchema);

module.exports = Orientation;
