const express = require("express");
const {
  userSignupController,
  userLoginController,
  logoutController,
} = require("./controller");
const { loginValidator } = require("./validators");

const authRouter = express.Router();

// /api/v1/auth/...
authRouter.post("/signup", loginValidator, userSignupController);
authRouter.post("/login", loginValidator, userLoginController);
authRouter.get("/logout", logoutController);

module.exports = { authRouter };
