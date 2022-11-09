var FeedbackService = require("../services/Feedback.service");
var mongoose = require("mongoose");

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List

exports.getFeedback = async function (req, res, next) {
  if (!req.params._id) {
    return res
      .status(400)
      .json({ status: 400, message: "Feedback ID be present" });
  }
  var filter = { _id: req.params._id };
  try {
    var gotFeedback = await FeedbackService.getFeedback(filter);
    if (!gotFeedback) {
      return res
        .status(400)
        .json({ status: 400, message: "Feedback ID does not exist" });
    } else {
      return res.status(200).json({
        status: 200,
        data: gotFeedback,
        message: "Succesfully got Feedback",
      });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getLastFeedbackByRoutine = async function (req, res, next) {
    if (!req.params._id) {
      return res
        .status(400)
        .json({ status: 400, message: "Routine ID be present" });
    }
    var filter = req.params._id ;
    try {
      var gotFeedback = await FeedbackService.getLastFeedbackByRoutine(filter);
      if (!gotFeedback) {
        return res
          .status(400)
          .json({ status: 400, message: "Routine ID does not exist" });
      } else {
        return res.status(200).json({
          status: 200,
          data: gotFeedback,
          message: "Succesfully got Feedback",
        });
      }
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  };

  exports.putFeedbackById = async function (req, res, next) {
    if (!req.params._id) {
      return res
        .status(400)
        .json({ status: 400, message: "Feedback ID be present" });
    }
    try {
    var filter = { _id: req.params._id };
    var changes = {
      pain: parseInt(req.body.pain),
      improve : parseInt(req.body.improve),
      feeling: parseInt(req.body.feeling),
      comment: req.body.comment
    };
      changedFeedback = await FeedbackService.putFeedback(filter, changes);
    } catch (e) {
      return res.status(400).json({ status: 400, message: e.message });
    }
  };

exports.completeExerciseInFeedback = async function (req, res, next) {
  console.log(req.body)
  if (!req.body.idExercise) {
    return res
      .status(400)
      .json({ status: 400, message: "Exercise ID be present" });
  }
  if (!req.body.idFeedback) {
    return res
      .status(400)
      .json({ status: 400, message: "Feedback ID be present" });
  }


  try {
    var gotFeedback = await FeedbackService.completeExerciseInFeedback(req.body.idFeedback, req.body.idExercise);
    if (!gotFeedback) {
      return res
        .status(400)
        .json({ status: 400, message: "Exercise or Feedback ID does not exist" });
    } else {
      return res.status(200).json({
        status: 200,
        data: gotFeedback,
        message: "Succesfully put Feedback",
      });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.addUserFeedback = async function (req, res, next) {
  console.log("Hola",req.body)
  if (!req.body.idFeedback) {
    return res
      .status(400)
      .json({ status: 400, message: "Feedback ID be present" });
  }
  var userInfo = {
    pain : req.body.pain ? parseInt(req.body.pain) : 0,
    comment : req.body.comment ? req.body.comment : 0,
    improve : req.body.improve ? parseInt(req.body.improve) : 0,
    feeling : req.body.feeling ? parseInt(req.body.feeling) : 0,
  }
  
  try {
    var gotFeedback = await FeedbackService.addUserFeedback(mongoose.Types.ObjectId(req.body.idFeedback), userInfo);
    if (!gotFeedback) {
      return res
        .status(400)
        .json({ status: 400, message: "Exercise or Feedback ID does not exist" });
    } else {
      return res.status(200).json({
        status: 200,
        data: gotFeedback,
        message: "Succesfully put Feedback",
      });
    }
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};