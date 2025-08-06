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
    const { name, date, note } = req.body;

    if (!name) {
      return res.status(400).json({
        isSuccess: false,
        message: "Name is required",
      });
    }

    const newSample = new SampleModel({
      user: userId,
      sampleName: name,
      date,
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
    const userId = req.user._id;
    const { mark, date, note } = req.body;

    const sampleData = await SampleModel.find({ user: userId }).sort({
      date: -1,
    });

    if (!mark) {
      mark = "no";
    }

    const newSampleMark = new SampleModel({
      user: userId,
      marksample: mark,
      date,
      note,
    });

    await newSampleMark.save();

    res.status(201).json({
      isSuccess: true,
      message: "Sample Marked successfully!",
      data: newSampleMark,
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
