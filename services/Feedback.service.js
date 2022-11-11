// Gettign the Newly created Mongoose Model we just created
var Feedback = require("../models/Feedback.model");
var Routine = require("../models/Routine.model");
var Exercise = require("../models/Exercise.model");

var mongoose = require("mongoose");
const moment = require("moment");

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
    fechaAyer.setDate(fechaHoy.getDate() - 1);
    for (let days = 0; days<6; days++) {
      fechaAyer.setDate(fechaHoy.getDate() - days);
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
    if (changes.pain) {
      feedback.pain = changes.pain;
    }
    if (changes.improve) {
      feedback.improve = changes.improve;
    }
    if (changes.feeling) {
      feedback.feeling = changes.feeling;
    }
    if (changes.comment) {
      feedback.comment = changes.comment;
    }
    changedFeedback = await feedback.save();
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

exports.completeExerciseInFeedback = async function (idFeedback, idExercise) {
  try {
    var feedback = await Feedback.findOne({_id : idFeedback});
    var routine = await Routine.findOne( {_id : feedback.routine})
    var exercise = await Exercise.findOne( {_id : idExercise})
    if (!feedback) {
      throw Error("Feedback does not exist")
    }
    if (!exercise) {
      throw Error("Exercise does not exist")
    }
    if (feedback.exercisesDone.includes(idExercise))
      throw Error("Exercise is already done")
    feedback.exercisesDone.push(idExercise)
    if (feedback.exercisesDone.length === routine.exercises.length)
    // Se completo el feedback con todos los ejercicios
    // Lo agrego a la feedbacksDone de la rutina
      routine.feedbacksDone = routine.feedbacksDone + 1
      changedRoutine = await routine.save();
      fechaActual = moment().format('D/MM/YYYY')
      if (fechaActual === moment(feedback.date).format('D/MM/YYYY')){
        //Agrego que se completo en el mismo dia
        feedback.complete = 1
      }else{
        feedback.complete = 2
      }
    changedFeedback = await feedback.save();
    return changedFeedback;
  } catch (e) {
    if (e.name === "CastError") {
      throw Error("Incorrect ID");
    }
    console.log(e);
    throw Error("And Error occured while putting the Feedback");
  }  

}

exports.addUserFeedback = async function (idFeedback,userInfo) {
  try {
    var feedback = await Feedback.findOne({_id : idFeedback});
    feedback.pain = userInfo.pain
    feedback.improve = userInfo.improve
    feedback.comment = userInfo.comment
    feedback.feeling = userInfo.feeling
    changedFeedback = await feedback.save();
    return changedFeedback;
  } catch (e) {
    if (e.name === "CastError") {
      throw Error("Incorrect ID");
    }
    console.log(e);
    throw Error("And Error occured while putting the Feedback");
  }  

}