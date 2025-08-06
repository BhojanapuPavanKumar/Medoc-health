const express = require("express");
const {
  addSampleController,
  getAllSampleController,
  markSampleController,
} = require("./controller");

const sampleRouter = express.Router();

// /api/v1/auth/...
sampleRouter.get("/get", getAllSampleController);
sampleRouter.post("/add", addSampleController);
sampleRouter.patch("/mark", markSampleController);

module.exports = { sampleRouter };
