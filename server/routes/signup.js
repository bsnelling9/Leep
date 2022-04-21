const router = require('express').Router();
const signupController = require('../controllers/signupController');

router.post("/", signupController.profile);

module.exports = router;