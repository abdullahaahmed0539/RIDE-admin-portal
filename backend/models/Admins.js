const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
    username: {
      type: String,
      require: [true, "User must have a unique username."],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      require: [true, "A user must have a password."],
    },
  });

const admin = mongoose.model("Admin", adminUserSchema);
module.exports = admin;