var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ObjectId = mongoose.Schema.ObjectId;
var ExerciseSchema = new mongoose.Schema({
    doctor: mongoose.Types.ObjectId,
    instructions: String,
    description: String,
    videoTitle: String,
    videoURL: String
})

ExerciseSchema.plugin(mongoosePaginate)
const Exercise = mongoose.model('Exercise', ExerciseSchema)

module.exports = Exercise;