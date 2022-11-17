// Gettign the Newly created Mongoose Model we just created 
var Doctor = require('../models/Doctor.model');
var Patient = require('../models/Patient.model');
var Routine = require('../models/Routine.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose')
var moment = require("moment");

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List


exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    
    var newUser = new Doctor({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword
    })
    var filtro = {
        email: user.email
    }
    var bandera = await this.chequearMail(filtro)
    if(bandera){
        try {
            // Saving the User 
            var savedUser = await newUser.save();
            var token = jwt.sign({
                id: savedUser._id
            }, process.env.SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            return token;
        } catch (e) {
            // return a Error message describing the reason 
            console.log(e)    
            throw Error("Error while Creating User")
        }
    }else{
        throw Error("El usuario ya está registrado")
    }
}

exports.chequearMail = async function (query){
    try {
        console.log("Query",query)
        var user = await Doctor.findOne(query)
        var bandera = user ? false : true
        return bandera
        

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while checking email');
    }
}

exports.getDoctor = async function (query){
    try {
        console.log("Query",query)
        var doctor = await Doctor.findOne(query).populate([{
            path: 'routines',
            model: 'Routine'
        }, {
            path: 'exercises',
            model: 'Exercise'
        }, {
            path: 'patients',
            model: 'Patient'
        }])
        return doctor
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while finding doctor');
    }
}

exports.getAllCommentsByDoctor = async function (doctor){
    try {
        var comments = []
        var patients = doctor.patients
        console.log(doctor)
        for(let i = 0; i<patients.length; i++){
            console.log("patient ",patients[i])
            for(let j = 0; j<patients[i].routines.length;j++){
                var routine = await Routine.findOne({_id:patients[i].routines[j]._id}).populate({
                    path: 'feedbacks',
                    model: 'Feedback'
                })
                console.log("routine ",routine)
                for(let k = 0; k<routine.feedbacks.length; k++){
                    console.log("feedback ",routine.feedbacks[k])
                    if(routine.feedbacks[k].comment){
                        comments.push({
                            name : patients[i].name +" "+ patients[i].lastName,
                            email: patients[i].email,
                            routine: routine.name,
                            comment: routine.feedbacks[k].comment,
                            date: moment(routine.feedbacks[k].date).format('D/M/YYYY'),
                            routineId: routine._id
                        })
                    }
                }
            }
        }
        return comments
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while finding doctor');
    }
}