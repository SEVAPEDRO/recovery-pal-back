var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ObjectId = mongoose.Schema.ObjectId;
var PatientSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    password: String,
    routines: [{ type: mongoose.Types.ObjectId, ref: 'routine' }],
    suffering: String

})

PatientSchema.plugin(mongoosePaginate)
const Patient = mongoose.model('Patient', PatientSchema)

module.exports = Patient;