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
            timesComplete_0 : 0,
            timesPain_0: 0,
            timesImprove_0: 0,
            timesFeeling_0: 0,
            timesComplete_1 : 0,
            timesPain_1: 0,
            timesImprove_1: 0,
            timesFeeling_1 : 0,
            timesComplete_2 : 0,
            timesPain_2: 0,
            timesImprove_2: 0,
            timesFeeling_2 : 0,
            timesPain_3: 0,
            timesImprove_3: 0,
            timesFeeling_3 : 0,
            totalFeedbacks: routine.feedbacks.length,
            feedbacksDone: routine.feedbacksDone
        }
        for(let j = 0; j < routine.feedbacks.length; j++){
            if(routine.feedbacks[j].complete===0){
                report.timesComplete_0++
            }
            else if(routine.feedbacks[j].complete===1){
                report.timesComplete_1++
            }
            else if(routine.feedbacks[j].complete===2){
                report.timesComplete_2++
            }

            if(routine.feedbacks[j].pain===0){
                report.timesPain_0++
            }
            else if(routine.feedbacks[j].pain===1){
                report.timesPain_1++
            }
            else if(routine.feedbacks[j].pain===2){
                report.timesPain_2++
            }
            else if(routine.feedbacks[j].pain===3){
                report.timesPain_3++
            }

            if(routine.feedbacks[j].improve===0){
                report.timesImprove_0++
            }
            else if(routine.feedbacks[j].improve===1){
                report.timesImprove_1++
            }
            else if(routine.feedbacks[j].improve===2){
                report.timesImprove_2++
            }
            else if(routine.feedbacks[j].improve===3){
                report.timesImprove_3++
            }

            if(routine.feedbacks[j].feeling===0){
                report.timesFeeling_0++
            }
            else if(routine.feedbacks[j].feeling===1){
                report.timesFeeling_1++
            }
            else if(routine.feedbacks[j].feeling===2){
                report.timesFeeling_2++
            }
            else if(routine.feedbacks[j].feeling===3){
                report.timesFeeling_3++
            }
        }
        return report
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error(e);
    }
}