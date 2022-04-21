const knex = require('knex')(require('../knexfile').development);


exports.songs = async (req, res) => {
    const song = await knex('song').orderBy("plays", 'desc')
    .limit(25)
    if (song) {
        for (let i = 0; i < song.length; i++) {
            if(song[i].songcover) {
                const imgbase64 = song[i].songcover.toString("base64")
                song[i].songcover = imgbase64
            }
        }
        res.send(song);
    } else {
        res.end('no songs in database');
    }
}