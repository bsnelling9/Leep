const knex = require('knex')(require('../knexfile').development);
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

router.post('/', (req, res) => {
    const allSongs = req.body.toptracks.track
    knex("song")
    .select("song")
    .insert(
        allSongs.map(track => {
            const id = track.mdid || uuidv4();
            return {
                songid: id,
                songname: track.name,
                listeners: track.listeners,
                playcount: track.playcount,
                username: track.artist.name,
                profile_username: track.artist.name
            }
        })
    )
    .then(result => {
        res.status(201).json({
            message: "User successfully signed up",
            result
        })
    })
    }
);

module.exports = router;

