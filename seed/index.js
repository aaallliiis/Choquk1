const Admin = require("../app/models/Admin");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
global.config = require("../config");

const createAdmin = async () => {
  const server = app.listen(config.port);
  mongoose.Promise = global.Promise;
  await mongoose.connect(config.database.url, {
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
  mongoose.disconnect();
  server.close();
};

createAdmin();
