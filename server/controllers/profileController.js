const knex = require('knex')(require('../knexfile').development);
const FileType = require('file-type');

exports.profileFollowing = (req, res) => {
    knex("username-username")
    .where({username: req.params.username})
    .then((data) => {
        res.json(data);
    })
    .catch((err) => {
        res.status(400).send(`Error getting following: ${err}`)
    })
}

exports.recentsongs = async (req, res) => {
    const song = await knex('song').where({username: req.params.id})
    if (song) {
        for (let i = 0; i < song.length; i++) {
            const imgbase64 = song[i].songcover.toString("base64")
            song[i].songcover = imgbase64
        }
         res.send(song);
    } else {
        res.end('No songs from that user');
    }
}

exports.getBanner = async (req, res) => {
    const banner = await knex('profile_pic').where({username: req.params.id})
    if (banner) {
        for (let i = 0; i < banner.length; i++) {
            const imgbase64 = banner[i].banner.toString("base64")
            banner[i].banner = imgbase64
        }
        res.send(banner);
    } else {
        res.end('No songs from that user');
    }
}
