const { UserModel } = require("../../../models/userSchema");
const bcrypt = require("bcrypt");
const {
  attachJWTToken,
  removeJWTToken,
} = require("../../../utils/jwtHelper.js");
const { handleGenericAPIError } = require("../../../utils/controllerHelpers");

const userSignupController = async (req, res) => {
  console.log("--> inside userSignupController");
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email: email,
    }).lean();

    if (user !== null) {
      res.status(400).json({
        isSuccess: false,
        message: "User already exists! Please Login",
        data: {},
      });
      return;
    }

    await UserModel.create({ email, password });

    res.status(201).json({
      isSuccess: true,
      message: "User created!",
      data: {},
    });
  } catch (err) {
    handleGenericAPIError("userSignupController", req, res, err);
  }
};

const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      email: email,
    }).lean();

    if (user === null) {
      res.status(400).json({
        isSuccess: false,
        message: "User does not exists! Please sign up first!",
        data: {},
      });
      return;
    }

    const { password: hashedPassword } = user;

    const isCorrect = await bcrypt.compare(password.toString(), hashedPassword);

    if (!isCorrect) {
      res.status(400).json({
        isSuccess: false,
        message: "Incorrect password! Please try again...",
        data: {},
      });
    }

    attachJWTToken(res, { email: user.email, _id: user._id });

    res.status(200);
    res.json({
      isSuccess: true,
      message: "Login successful!",
      data: {
        user: { email: user.email, _id: user._id },
      },
    });
  } catch (err) {
    handleGenericAPIError("userLoginController", req, res, err);
  }
};

const logoutController = async (req, res) => {
  console.log("--> inside logoutController");
  removeJWTToken(res, {});
  res.status(200).json({ isSuccess: true, message: "Logout success!" });
};

module.exports = {
  userSignupController,
  userLoginController,
  logoutController,
};
