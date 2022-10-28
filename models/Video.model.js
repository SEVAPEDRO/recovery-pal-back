const mongoose =require('mongoose');

const schema = mongoose.Schema;

var videoSchema = new schema({
    name: String,
    description: String,
    url: String
})

const video = mongoose.model('upload', videoSchema);
module.exports = video; 