const { SampleModel } = require("../../../models/sampleSchema");
const { handleGenericAPIError } = require("../../../utils/controllerHelper");

const getAllSampleController = async (req, res) => {
  try {
    const userId = req.user._id;

    const sampleData = await SampleModel.find({ user: userId }).sort({
      date: -1,
    });

    if (isampleData.length === 0) {
      return res.status(200).json({
        isSuccess: true,
        message: "No data is available",
        data: [],
      });
    }

    res.status(200).json({
      isSuccess: true,
      data: sampleData,
    });
  } catch (error) {
    handleGenericAPIError("getAllSampleController", req, res, error);
  }
};

const addSampleController = async (req, res) => {
  try {
    const userId = req.user._id;
    const sampleId = req.params.id;
    const { sampleName, hospitalName, scheduleTime, note } = req.body;

    if (!name) {
      return res.status(400).json({
        isSuccess: false,
        message: "Name is required",
      });
    }

    const newSample = new SampleModel({
      user: userId,
      sampleName,
      hospitalName,
      scheduleTime,
      sampleId,
      note,
    });

    await newSample.save();

    res.status(201).json({
      isSuccess: true,
      message: "Sample added successfully!",
      data: newSample,
    });
  } catch (error) {
    handleGenericAPIError("addSampleController", req, res, error);
  }
};

const markSampleController = async (req, res) => {
  try {
    const agentId = req.user._id;
    const sampleId = req.params.id;

    const updatedSample = await SampleModel.findOneAndUpdate(
      { _id: sampleId, agentId },
      { sampleCollected: true },
      { new: true }
    );

    if (!updatedSample) {
      return res.status(404).json({
        isSuccess: false,
        message: "Sample not found ",
      });
    }

    res.status(200).json({
      isSuccess: true,
      message: "Sample marked as collected successfully!",
      data: updatedSample,
    });
  } catch (error) {
    handleGenericAPIError("markSampleController", req, res, error);
  }
};

module.exports = {
  getAllSampleController,
  addSampleController,
  markSampleController,
};
