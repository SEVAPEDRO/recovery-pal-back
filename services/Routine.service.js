// Gettign the Newly created Mongoose Model we just created 
var Routine = require('../models/Routine.model');
var Doctor = require('../models/Doctor.model');
var Patient = require('../models/Patient.model');

var mongoose = require('mongoose')
var moment = require('moment'); // require
const Feedback = require('../models/Feedback.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List

exports.createRoutine = async function (routine) {
    // Creating a new Mongoose Object by using the new keyword
    var newRoutine = new Routine({
        patient: routine.patient,
        doctor: routine.doctor,
        name: routine.name,
        schedule:{
            weeks: routine.weeks,
            days: routine.days
        },
        exercises: routine.exercises,
        feedbacksDone: 0
    })
    try {
        // Saving the User 
        var savedRoutine = await newRoutine.save();
        return savedRoutine;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Routine")
    }
}

    
exports.getRoutine = async function (query){
    try {
        console.log("Query",query)
        console.log(typeof(query))
        var routine = await Routine.findOne({_id:query}).populate([{
            path: 'doctor',
            model: 'Doctor'
        }, {
            path: 'patient',
            model: 'Patient'
        }, {
            path: 'exercises.exercise',
            model: 'Exercise'
        }, {
            path: 'feedbacks',
            model: 'Feedback'
        }])
    return routine
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while finding routine');
    }
}

exports.addRoutineInDoctor = async function (routine){
    try {
        console.log("Soy routine",routine)
        var doctor = await Doctor.findOne(routine.doctor)
        console.log("Soy routine",routine.doctor, doctor)
        doctor.routines.push(routine._id)
        var upDoc = await doctor.save();
        return upDoc
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while adding Routine in Doctor');
    }
}

exports.addRoutineInPatient = async function (routine){
    try {
        var patient = await Patient.findOne(routine.patient)
        patient.routines.push(routine._id)
        var upPatient = await patient.save();
        return upPatient
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while adding Routine in Patient');
    }
}

function safeMath(today, laterDay) {
    today += 1
    laterDay += 1
    var sum = laterDay - today
    if(sum<0){
        sum += 7
    }
    return sum;
}

exports.createFeedbacks = async function (routine){
    try {
        var days = routine.schedule.days
        var weeks = routine.schedule.weeks

        var today = new Date()
        today.setHours(today.getHours() - 3);

        var i = 0
        while(i < days.length){
            if(today.getDay() === days[i]){
                break
            }else if(today.getDay() < days[i] ){
                break
            }else if(today.getDay() > days[i] && i === days.length-1){
                i = 0
                break
            }
            i++
        }

        let cont =days.length * weeks
        while(cont > 0){
            for(let j = i; j < days.length; j++){
                var sum = safeMath(today.getDay(), days[j])
                today.setDate(today.getDate() + sum);
                await this.creaFeedback(routine,today)
                cont -= 1
                if(cont<=0){
                    break
                }
            }
            i=0
        }
        
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while creating feedbacks');
    }
}

exports.creaFeedback = async function (routine,date){
    try {
       
        //Creo Feedback
        var feedback = new Feedback({
            routine: routine._id,
            patient: routine.patient,
            date: date,
            complete: false,
            pain: false,
            improve: false,
            exercisesDone : []

        });
        var newFeedback = await feedback.save();

        //Adiciono Feedback en rutina
        var oldroutine = await Routine.findOne(routine._id)
        oldroutine.feedbacks.push(newFeedback._id)
        var upRoutine = await oldroutine.save();
        
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while creating feedbacks');
    }
}