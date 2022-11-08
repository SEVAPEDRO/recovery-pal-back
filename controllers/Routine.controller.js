var RoutineService = require('../services/Routine.service');
var mongoose = require('mongoose')

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List

exports.createRoutine = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var exercises = req.body.exercises
    var exercisesID = req.body.exercises.map(x => mongoose.Types.ObjectId(x.exercise))
    for(let i = 0; i < exercisesID.length; i++){
        exercises[i].exercise = exercisesID[i]
    }

    var days = req.body.days.map(x => parseInt(x))
    var Routine = {
        patient: mongoose.Types.ObjectId(req.body.patient),
        doctor: mongoose.Types.ObjectId(req.body.doctor),
        comment: req.body.comment,
        name: req.body.name,
        exercises: exercises,
        weeks: parseInt(req.body.weeks),
        days: days
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdRoutine = await RoutineService.createRoutine(Routine)
        var doctor = await RoutineService.addRoutineInDoctor(createdRoutine)
        var patient = await RoutineService.addRoutineInPatient(createdRoutine)

        var feedBacks = await RoutineService.createFeedbacks(createdRoutine)
        return res.status(201).json({createdRoutine, message: "Succesfully Created Routine"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getRoutine = async function (req, res, next){
    // Req.Body contains the form submit values.
    console.log("llegue al controller getRoutine",req.body)
    var filter =  mongoose.Types.ObjectId(req.body.id)
    try {
        // Calling the Service function with the new object from the Request Body
        var routine = await RoutineService.getRoutine(filter)
        return res.status(200).json({routine, message: "Succesfully retrieved Routine"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message})
    }
}