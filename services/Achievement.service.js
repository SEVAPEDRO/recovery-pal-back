var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose')
var Patient = require('../models/Patient.model');
var Feedback = require('../models/Feedback.model');
var Routine = require('../models/Routine.model');


// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List

exports.retrieveAchievements = async function (user) {
    try {
        var routineAchievement = 0
        var feedBackAchievement = 0
        var exerciseAchievement = 0
        var routines = await Patient.findOne(user,{routines:true}).populate(
            {path: "routines", model: "Routine"}
        )
        for(let i = 0; i < routines.routines.length; i++){
            if(routines.routines[i].feedbacksDone === routines.routines[i].feedbacks.length){
                routineAchievement++
            }
            feedBackAchievement += routines.routines[i].feedbacksDone
            for(let j = 0; j < routines.routines[i].feedbacks.length; j++){
                var feedback = await Feedback.findOne({_id: routines.routines[i].feedbacks[j]},{exercisesDone:true})
                exerciseAchievement += feedback.exercisesDone.length
            }
        }
        var report = {
            routineAchievement,
            feedBackAchievement,
            exerciseAchievement
        }
        return report
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error(e);
    }
}

exports.retrieveAchievementsRoutine = async function (query) {
    try {
        
        var routine = await Routine.findOne(query,{feedbacks:true, exercises:true, feedbacksDone:true}).populate(
            {path: "feedbacks", model: "Feedback"}
        )
        var report = {
            routineDone : 0,
            feedbackDone: 0,
            exerciseDone: 0,
            totalRoutine: 1,
            totalFeedbacks: routine.feedbacks.length,
            totalExercises: routine.feedbacks.length*routine.exercises.length
        }
        if(routine.feedbacksDone === routine.feedbacks.length){
            report.routineDone++
        }
        report.feedbackDone += routine.feedbacksDone
        for(let j = 0; j < routine.feedbacks.length; j++){
            report.exerciseDone += routine.feedbacks[j].exercisesDone.length
        }
        return report
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error(e);
    }
}

exports.routineReport = async function (query) {
    try {
        
        var routine = await Routine.findOne(query,{feedbacks:true,feedbacksDone:true}).populate(
            {path: "feedbacks", model: "Feedback"}
        )
        var report = {
            timesComplete : 0,
            timesPain: 0,
            timesImprove: 0,
            totalFeedbacks: routine.feedbacks.length,
            feedbacksDone: routine.feedbacksDone
        }
        for(let j = 0; j < routine.feedbacks.length; j++){
            if(routine.feedbacks[j].complete){
                report.timesComplete++
            }
            if(routine.feedbacks[j].pain){
                report.timesPain++
            }
            if(routine.feedbacks[j].improve){
                report.timesImprove++
            }
        }
        return report
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error(e);
    }
}