const knex = require('knex')(require('../knexfile').development);
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');

router.post('/', (req, res) => {

    const id = req.body.artist.mbid || uuidv4(); 
    const similarArtist = req.body.artist.similar.artist.map(item => {return item['name']})
    const artistGenres = req.body.artist.tags.tag.map(item => {return item['name']})
    knex("profile")
    .select("profile")
    .insert({
        userid: id,
        username: req.body.artist.name,
        summary: req.body.artist.bio.summary,
        content: req.body.artist.bio.content,
        listeners: req.body.artist.stats.listeners,
        playcount: req.body.artist.stats.playcount,
        similar: JSON.stringify(similarArtist),
        tag: JSON.stringify(artistGenres),
    })
    .then(result => {
        res.status(201).json({
            message: "Artist succefully uploaded",
            result
        })
    })
    }
);


module.exports = router;