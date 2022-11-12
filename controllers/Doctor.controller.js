var DoctorService = require('../services/Doctor.service');
var mongoose = require('mongoose')
var MailController = require('./mail.controller')
var PatientService = require('../services/Patient.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List

exports.createUser = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var User = {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await DoctorService.createUser(User)
        return res.status(201).json({createdUser, message: "Succesfully Created User"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getDoctor = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var filter = {
        _id: mongoose.Types.ObjectId(req.body.id)
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var doctor = await DoctorService.getDoctor(filter)
        return res.status(200).json({doctor, message: "Succesfully retrieved Doctor"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message})
    }
}


exports.addPatientToDoctor= async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)


    try {
        // Calling the Service function with the new object from the Request Body
        var doctor = await DoctorService.getDoctor({_id: mongoose.Types.ObjectId(req.body.idDoctor)})
        var patient = await PatientService.getPatient({email: req.body.email})
    
        if (!patient || !doctor) {
            return res.status(404).json({message: "No se encontro el doctor o paciente"})
        }
        doctor.patients.push(mongoose.Types.ObjectId(patient._id))
        doctor.save()
        return res.status(200).json({message: "Succesfully added Patient to Doctor"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message})
    }
}
