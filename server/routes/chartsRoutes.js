const router = require('express').Router();
const chartsController = require('../controllers/chartsController');

router.get("/", chartsController.songs);

module.exports = router;