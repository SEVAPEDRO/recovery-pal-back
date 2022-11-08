var express = require('express')
var router = express.Router()
var DoctorController = require('../../controllers/Doctor.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/doctor.routes');
  });

router.post('/registration', DoctorController.createUser)
router.post('/getDoctor',DoctorController.getDoctor)
router.post('/addPatientToDoctor',DoctorController.addPatientToDoctor)





// Export the Router
module.exports = router;