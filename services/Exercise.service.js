// Gettign the Newly created Mongoose Model we just created 
var Exercise = require('../models/Exercise.model');
var jwt = require('jsonwebtoken');
var Doctor = require('../models/Doctor.model');

var mongoose = require('mongoose')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List

exports.getExercise = async function (filtro) {
    try {
        //var exercise = await Exercise.findOne(filtro)
        var exercise = await Exercise.findOne(filtro)

        return exercise;
    } catch (e) {
        if (e.name === "CastError") {
            throw Error("Incorrect ID")
        }
        console.log(e)
        throw Error("And Error occured while getting the Exercise");
    }
}


exports.putExercise = async function (filter, changes) {
    try {
        var exercise = await Exercise.findOne(filter)
        
        if (changes.videoURL)  {
            exercise.videoURL = changes.videoURL
        }
        if (changes.videoTitle)  {
            exercise.videoTitle = changes.videoTitle
        }
        if (changes.instructions)  {
            exercise.instructions = changes.instructions
        }
        if (changes.doctor)  {
            exercise.doctor = changes.doctor
        }
        if (changes.description)  {
            exercise.description= changes.description
        }
        /*
        var exercise = await Exercise.findOneAndUpdate(filter, changes, {
            new: true
          })
        */

        
        changedExercise = await exercise.save()
        
        //await Exercise.findOneAndUpdate(filter, {$set : changes}, {new: true})
        return changedExercise;
    } catch (e) {
        if (e.name === "CastError") {
            throw Error("Incorrect ID")
        }
        console.log(e)
        throw Error("And Error occured while putting the Exercise");
    }
}

exports.postExercise = async function (inserts) {
    try {
        var newExercise = new Exercise(inserts)
        newExercise.save()
        return newExercise;
    } catch (e) {
        console.log(e)
        throw Error("And Error occured while saving the Exercise");
    }
}



exports.deleteExercise = async function (filtro) {
    try {
        //var exercise = await Exercise.findOne(filtro)
        var exercise = await Exercise.findOneAndDelete(filtro)
        return exercise;
    } catch (e) {
        if (e.name === "CastError") {
            throw Error("Incorrect ID")
        }
        console.log(e)
        throw Error("And Error occured while deletting the Exercise");

    }
}


exports.getExercisesByVideoTitleMatch = async function (filtro) {
    try {
        //var exercise = await Exercise.findOne(filtro)
        var exercises = await Exercise.find(filtro)

        return exercises;
    } catch (e) {
        if (e.name === "CastError") {
            throw Error("Incorrect ID")
        }
        console.log(e)
        throw Error("And Error occured while getting the Exercises");
    }
}

exports.addExerciseInDoctor = async function (exercise){
    try {
        var doctor = await Doctor.findOne(exercise.doctor)
        doctor.exercises.push(exercise._id)
        var upDoc = await doctor.save();
        return upDoc
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while adding Exercise in Doctor');
    }
}

exports.deleteExerciseInDoctor = async function (exercise){
    try {
        var doctor = await Doctor.findOne(exercise.doctor)
        doctor.exercises.pull(exercise._id)
        var upDoc = await doctor.save();
        return upDoc
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while deletting Exercise in Doctor');
    }
}
