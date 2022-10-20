var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ObjectId = mongoose.Schema.ObjectId;
var RoutineSchema = new mongoose.Schema({
    patient: { type: mongoose.Types.ObjectId, ref: 'patient' },
    doctor: { type: mongoose.Types.ObjectId, ref: 'doctor' },
    name: String,
    feedbacks: [{ type: mongoose.Types.ObjectId, ref: 'feedback' }],
    schedule:{
        weeks: Number,
        times: Number
    },
    exercises: [{
        sets: Number,
        weight: String,
        exercise: {type: mongoose.Types.ObjectId, ref: 'exercise' }
    }],
})

RoutineSchema.plugin(mongoosePaginate)
const Routine = mongoose.model('Routine', RoutineSchema)

module.exports = Routine;