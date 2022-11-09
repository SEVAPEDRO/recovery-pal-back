var express = require('express')
var router = express.Router()
var FeedbackController = require('../../controllers/Feedback.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/:_id', FeedbackController.getFeedback);
router.get('/getLastFeedbackByRoutine/:_id', FeedbackController.getLastFeedbackByRoutine);
router.put('/:_id', FeedbackController.putFeedbackById);
router.post('/completeExerciseInFeedback', FeedbackController.completeExerciseInFeedback);
router.put('/addUserFeedback', FeedbackController.addUserFeedback);

// Export the Router
module.exports = router;
