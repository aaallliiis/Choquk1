module.exports = function (schema) {
  const transform = function (doc, ret) {
    ret.id = ret._id.toString();

    delete ret._id;
    delete ret.__v;
  };

  schema.options.toJSON = schema.options.toJSON || {};
  schema.options.toJSON.transform = transform;
  schema.set("toJSON", schema.options.toJSON);
};
