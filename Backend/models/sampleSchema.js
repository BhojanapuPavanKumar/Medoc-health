const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema(
  {
    sampleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sampleName: {
      type: String,
      required: [true, "name is required"],
      trim: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    marksample: {
      type: String,
      trim: true,
      enum: ["yes", "no"],
      default: "no",
    },
    note: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SampleModel = mongoose.model("Income", sampleSchema);
module.exports = { SampleModel };
