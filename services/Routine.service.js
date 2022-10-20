// Gettign the Newly created Mongoose Model we just created 
var Routine = require('../models/Routine.model');
var Doctor = require('../models/Doctor.model');
var Patient = require('../models/Patient.model');

var mongoose = require('mongoose')

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
            times: routine.times
        },
        exercises: routine.exercises
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
            path: 'exercises',
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
        var doctor = await Doctor.findOne(routine.doctor)
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