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
      required: [true, "sample name is required"],
      trim: true,
    },
    hospitalName: {
      type: String,
      required: [true, "hospital name is required"],
      trim: true,
    },
    scheduleTime: {
      type: Date,
      default: Date.now,
    },
    sampleCollected: {
      type: Boolean,
      default: false,
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
