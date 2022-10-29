const cloudinary = require("../utils/cloudinary");
const Video = require ("../models/Video.model");

exports.uploadVideo = (req, res) => {
    cloudinary.uploader.upload(req.file.path,
        {
            resource_type: "video",
            folder: "video",
          },
        
        (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        var upload = new Video({
            name: req.body.name,
            description: req.body.description,
            url: result.url,
            
        });
        upload.save((err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
            return res.status(200).send(result);
        }
        );
    }
    );
} 