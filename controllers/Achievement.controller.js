var mongoose = require('mongoose')
var AchievementService = require("../services/Achievement.service")

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List

exports.retrieveAchievements = async function (req, res, next) {
    var Patient = {
        _id: mongoose.Types.ObjectId(req.body.patientId)
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var Achievements = await AchievementService.retrieveAchievements(Patient)
        return res.status(200).json({Achievements, message: "Succesfully retireved Achievements"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: e.message})
    }
}