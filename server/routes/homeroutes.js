const knex = require('knex')(require('../knexfile').development);
const router = require('express').Router();


router.get('/search/:artist', async (req, res) => {
    const artist = req.params.artist;
    console.log(artist)
    const artistExist = await knex('profile').where({username: artist}).first()
    console.log(artistExist)
    if(artistExist) {
        res.send(true)
    } else {
        res.send(false)
    }
})

router.get('/discover', async (req, res) => {
    
})
module.exports = router;