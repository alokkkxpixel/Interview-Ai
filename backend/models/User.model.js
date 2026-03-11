const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: [true, "Username already exists"],
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists"],
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true },
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = mongoose.model("User", userSchema);
