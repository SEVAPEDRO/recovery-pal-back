/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()

var patients = require('./api/patient.route')
var doctors = require('./api/doctor.route')
var exercises = require('./api/exercise.route')
var routines = require('./api/routine.route')
var feedbacks = require('./api/feedback.route')
var files = require('./api/uploadFile.route')

router.use('/patients', patients);
router.use('/doctors', doctors);
router.use('/exercises', exercises);
router.use('/routines', routines);
router.use('/feedbacks', feedbacks);
router.use('/files', files)
 
module.exports = router;
