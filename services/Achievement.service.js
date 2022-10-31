var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose')
var Patient = require('../models/Patient.model');
var Feedback = require('../models/Feedback.model');

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
        throw Error('Error while finding patient');
    }
}