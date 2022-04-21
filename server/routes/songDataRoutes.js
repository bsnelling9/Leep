const knex = require('knex')(require('../knexfile').development);
const router = require('express').Router();
const songDataController = require('../controllers/songDataController');


router.post('/:id/playcount', songDataController.playCount)

module.exports = router;