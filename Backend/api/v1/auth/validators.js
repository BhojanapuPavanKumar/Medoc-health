const { handleGenericAPIError } = require("../../../utils/controllerHelpers");

const loginValidator = (req, res, next) => {
  console.log("--> loginValidator", req.body);
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        isSuccess: false,
        message: "Email and Password is required",
        data: {},
      });
      return;
    }
    next();
  } catch (err) {
    handleGenericAPIError("loginValidator", req, res, err);
  }
};

module.exports = { loginValidator };
