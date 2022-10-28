// Gettign the Newly created Mongoose Model we just created 
var Patient = require('../models/Patient.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mongoose = require('mongoose')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List

exports.loginUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        console.log("login:",user)
        var _details = await Patient.findOne({
            email: user.email
        });
        if (!_details) throw Error("Usuario no encontrado")
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) throw Error("Contraseña incorrecta")

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return {token:token, user:_details};
    } catch (e) {
        // return a Error message describing the reason     
        throw Error(e.message)
    }

}

exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    
    var newUser = new Patient({
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
        var user = await Patient.findOne(query)
        var bandera = user ? false : true
        return bandera
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while checking email');
    }
}

exports.getPatient = async function (query){
    try {
        console.log("Query",query)
        var patient = await Patient.findOne(query).populate(
            {path: "routines", model: "Routine"}            )
        return patient
    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services",e)
        throw Error('Error while finding patient');
    }
}

exports.updatePass = async function (user) {
    var id = {email :user.email}
    try {
        //Find the old User Object by the Id
        var oldUser = await Patient.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        throw Error("El usuario no existe")
    }
    if(oldUser.mascota != user.mascota){
        throw Error("El nombre de mascota no es correcto")
    }
    //Edit the User Object
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    oldUser.password = hashedPassword
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        console.log(e)
        throw Error(e.message);
    }
}

exports.getUserByEmail = async function (filtro){
    try {
        var user = await Patient.findOne(filtro)
        return user;
    } catch (e) {
        console.log(e)
        throw Error("And Error occured while getting the User");
    }
}

