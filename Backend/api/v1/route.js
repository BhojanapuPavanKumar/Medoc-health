const express = require("express");
const { authRouter } = require("./auth/routes");
const { sampleRouter } = require("./samples/routes");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

apiRouter.use("/samples", sampleRouter);

module.exports = { apiRouter };
