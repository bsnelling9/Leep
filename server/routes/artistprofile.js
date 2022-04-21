const knex = require('knex')(require('../knexfile').development);
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');


router.get('/follow/:username/:followartist', async (req, res) => {
    const user = req.params.username;
    const artist = req.params.followartist
    const isFollowing = await knex('username-username').where({username: user, username_following: artist}).first()
    if(isFollowing) {res.json(isFollowing)}
    else res.send(false)
})

router.get('/:id', (req, res) => {
    const artist = req.params.id;
    knex('profile')
    .where({username: artist})
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(err)
    })  
})

router.get('/:id/toptracks', (req, res) => {
    const artist = req.params.id;
    knex('song')
    .where({username: artist})
    .orderBy("plays", 'desc')
    .limit(5)
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(err)
    })  
})

router.post('/:id/follow', (req, res) => {
    const user = req.body.username;
    knex('username-username')
    .insert({ username: user, username_following: req.body.followArtist, followid: uuidv4()})
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
    })
})

router.delete('/:id/unfollow', async (req, res) => {
    const followid = req.body.followid
    const unFollow = await knex('username-username').where({followid: followid}).del()
    if(unFollow){res.send(true)}
    else {
        res.send(false)
    }
})

module.exports = router;