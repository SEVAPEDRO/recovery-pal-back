// Gettign the Newly created Mongoose Model we just created
var Feedback = require("../models/Feedback.model");
var Routine = require("../models/Routine.model");

var mongoose = require("mongoose");

// Saving the context of this module inside the _the variable
_this = this;

exports.getFeedback = async function (filtro) {
  try {
    var feedback = await Feedback.findOne(filtro);
    return feedback;
  } catch (e) {
    if (e.name === "CastError") {
      throw Error("Incorrect ID");
    }
    console.log(e);
    throw Error("Error while finding feedback");
  }
};

exports.getLastFeedbackByRoutine = async function (routineId) {
  try {
    var routineSearched = Routine.findOne({ _id: routineId });
    if (!routineSearched) {
      throw Error("Routine does not exist");
    }
    var fechaHoy = new Date();
    var fechaAyer = new Date();
    fechaAyer.setDate(fechaAyer.getDate() - 1);
    for (let days = 0; days<6; days++) {
      var feedback = await Feedback.findOne({
        routine: routineId,
        date: { $gte: fechaAyer, $lt: fechaHoy },
      });  
      if (feedback != undefined)
        break
    }
    if (feedback === undefined)
      throw Error("There is not feedbacks for this period");


    /*
    if (!feedback) {
      var feedback = new Feedback({
        routine: routineId,
        pacient: routineSearched.pacient,
      });
      feedback.save();
    }
    */
    return feedback;
  } catch (e) {
    if (e.name === "CastError") {
      throw Error("Incorrect ID");
    }
    console.log(e);
    throw Error("Error while finding feedback");
  }
};

exports.putFeedback = async function (filter, changes) {
  try {
    var feedback = await Feedback.findOne(filter);
    await deleteFeedbackInRoutine(feedback);

    if (changes.patient) {
      feedback.patient = changes.patient;
    }
    if (changes.routine) {
      feedback.routine = changes.routine;
    }
    if (changes.complete) {
      feedback.complete = changes.complete;
    }
    if (changes.pain) {
      feedback.pain = changes.pain;
    }
    if (changes.improve) {
      feedback.improve = changes.improve;
    }
    if (changes.exercisesDone) {
      feedback.exercisesDone = changes.exercisesDone;
    }

    changedFeedback = await feedback.save();
    await addFeedbackInRoutine(changedFeedback);

    return changedFeedback;
  } catch (e) {
    if (e.name === "CastError") {
      throw Error("Incorrect ID");
    }
    console.log(e);
    throw Error("And Error occured while putting the Feedback");
  }
};

exports.addFeedbackInRoutine = async function (feedback) {
  try {
    var routine = await Routine.findOne(feedback.routine);
    routine.feedbacks.push(feedback._id);
    var upRoutine = await routine.save();
    return upRoutine;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while adding Feedback in routine");
  }
};

exports.deleteFeedbackInRoutine = async function (feedback) {
  try {
    var routine = await Routine.findOne(feedback.routine);
    routine.feedbacks.pull(feedback._id);
    var upRoutine = await routine.save();
    return upRoutine;
  } catch (e) {
    // return a Error message describing the reason
    console.log("error services", e);
    throw Error("Error while deletting Feedback in routine. Routine may not exist.");
  }
};
