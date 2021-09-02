const Admin = require("../app/models/Admin");
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const createAdmin = async () => {
  app.listen(8080);
  mongoose.Promise = global.Promise;
  await mongoose.connect("mongodb://localhost/choquk", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    authSource: "admin",
  });
  const admin = new Admin({
    username: "admin",
    password: "admin",
  });

  await admin.save();
  console.log("admin created");
};

createAdmin();
