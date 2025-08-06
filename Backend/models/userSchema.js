const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", "m", "f", "o"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password.toString(), 12);
  }
  next();
});

userSchema.pre("findByIdAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});
userSchema.pre("findOneAndUpdate", function (next) {
  this.options.runValidators = true;
  next();
});
userSchema.pre("updateOne", function (next) {
  this.options.runValidators = true;
  next();
});
userSchema.pre("updateMany", function (next) {
  this.options.runValidators = true;
  next();
});

const UserModel = model("user", userSchema);

module.exports = { UserModel };
