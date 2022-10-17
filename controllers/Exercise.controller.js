var ExerciseService = require("../services/Exercise.service");
var mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List

exports.getExerciseById = async function (req, res, next) {
  if (!req.params._id) {
    return res
      .status(400)
      .json({ status: 400, message: "Exercise ID be present" });
  }
  var filter = { _id: req.params._id };
  try {
    var gotExercise = await ExerciseService.getExercise(filter);
    if (!gotExercise) {
      return res
        .status(400)
        .json({ status: 400, message: "Exercise ID does not exist" });
    } else {
      return res
        .status(200)
        .json({
          status: 200,
          data: gotExercise,
          message: "Succesfully getted Exercise",
        });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.putExerciseById = async function (req, res, next) {
  if (!req.params._id) {
    return res
      .status(400)
      .json({ status: 400, message: "Exercise ID be present" });
  }

  var filter = { _id: req.params._id };
  var changes = {
    doctor: mongoose.Types.ObjectId(req.body.doctor),
    instructions: req.body.instructions,
    videoTitle: req.body.videoTitle,
    videoURL: req.body.videoURL,
  };
  try {
    var gotExercise = await ExerciseService.getExercise(filter);
    if (!gotExercise) {
      return res
        .status(400)
        .json({ status: 400, message: "Exercise ID does not exist" });
    } else {
      //Necesito haber hecho el get antes de hacer el PUT?
      deleteDoctor = await ExerciseService.deleteExerciseInDoctor(gotExercise)
      changedExercise = await ExerciseService.putExercise(filter, changes);
      insertedDoctor = await ExerciseService.addExerciseInDoctor(changedExercise)
      return res
        .status(200)
        .json({
          status: 200,
          data: changedExercise,
          message: "Succesfully putted Exercise",
        });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.postExercise = async function (req, res, next) {
  if (!req.body.doctor) {
    // debo detectar que sea un id
    return res
      .status(400)
      .json({ status: 400, message: "Doctor ID be presente" });
  }
  if (!req.body.instructions) {
    return res
      .status(400)
      .json({ status: 400, message: "Instructions be presente" });
  }
  if (!req.body.videoTitle) {
    return res
      .status(400)
      .json({ status: 400, message: "Video Title be presente" });
  }
  if (!req.body.videoURL) {
    return res
      .status(400)
      .json({ status: 400, message: "Video URL be presente" });
  }

  var inserted = {
    doctor: mongoose.Types.ObjectId(req.body.doctor),
    instructions: req.body.instructions,
    videoTitle: req.body.videoTitle,
    videoURL: "http://127.0.0.1:8080/videos/" + req.body.videoURL,
  };
  try {
    //Necesito haber hecho el get antes de hacer el PUT?
    var posttedExercise = await ExerciseService.postExercise(inserted);
    var doctor = await ExerciseService.addExerciseInDoctor(posttedExercise._id)
    return res
      .status(200)
      .json({
        status: 200,
        data: posttedExercise,
        message: "Succesfully postted Exercise",
      });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.deleteExerciseById = async function (req, res, next) {
  if (!req.params._id) {
    return res
      .status(400)
      .json({ status: 400, message: "Exercise ID be present" });
  }
  var filter = { _id: req.params._id };
  try {
    var deletedExercise = await ExerciseService.deleteExercise(filter);
    var doctor = await ExerciseService.deleteExerciseInDoctor(deletedExercise)
    if (!deletedExercise) {
      return res
        .status(400)
        .json({ status: 400, message: "Exercise ID does not exist" });
    } else {
      return res
        .status(200)
        .json({
          status: 200,
          data: deletedExercise,
          message: "Succesfully deletted Exercise",
        });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getExercisesByVideoTitleMatch = async function (req, res, next) {
  if (!req.query.videoTitle) {
    return res
      .status(400)
      .json({ status: 400, message: "Video Title be present" });
  }
  if (!req.query.doctor) {
    return res.status(400).json({ status: 400, message: "Doctor be present" });
  }
  var filter = {
    videoTitle: { $regex: req.query.videoTitle, $options: "i" },
    doctor: mongoose.Types.ObjectId(req.query.doctor)
  };
  try {
    var gotExercises = await ExerciseService.getExercisesByVideoTitleMatch(
      filter
    );
    console.log(filter)
    if (!gotExercises) {
      return res
        .status(400)
        .json({ status: 400, data: [], message: "Error getting exercises" });
    } else {
      return res
        .status(200)
        .json({
          status: 200,
          data: gotExercises,
          message: "Succesfully getted Exercises",
        });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
