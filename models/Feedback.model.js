var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ObjectId = mongoose.Schema.ObjectId;
var FeedbackSchema = new mongoose.Schema({
    patient: mongoose.Types.ObjectId,
    routine:  mongoose.Types.ObjectId,
    complete: Boolean,
    pain: Boolean,
    improve: Boolean,
    exercisesDone: [mongoose.Types.ObjectId],
    date: Date,
}
)

FeedbackSchema.plugin(mongoosePaginate)
const Feedback = mongoose.model('Feedback', FeedbackSchema)

module.exports = Feedback;