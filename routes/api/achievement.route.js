var express = require('express')
var router = express.Router()
var AchievementController = require('../../controllers/Achievement.controller');

// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a la ruta de  api/Achievement.routes');
  });

router.post('/', AchievementController.retrieveAchievements)


// Export the Router
module.exports = router;