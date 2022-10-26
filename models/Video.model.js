const mongoose =require('mongoose');

const schema = mongoose.Schema;

var videoSchema = new schema({
    name: String,
    url: String,
    cloudinary_id: String,
    description: String,
})

const video = mongoose.model('upload', videoSchema);
module.exports = video; 