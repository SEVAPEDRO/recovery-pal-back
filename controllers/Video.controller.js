const cloudinary = require('../utils/cloudinary');
const Video = require('../models/Video.model');

exports.uploadVideo = async (req, res) => {
  try {
    const file = req.body.file;
    console.log(file);
    const uploadResponse = await cloudinary.uploader.upload(file);
    console.log(uploadResponse);
    res.status(200).json({ message: 'Se subio' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: 'Something went wrong' });
  }
};
