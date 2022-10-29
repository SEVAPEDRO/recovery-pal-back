const router = require("express").Router();
const storage = require("../../utils/multer");
const videoController = require("../../controllers/Video.controller");

router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/Routine.routes');
  });


router.post('/uploadVideo', storage.single('video'), videoController.uploadVideo);

module.exports = router;