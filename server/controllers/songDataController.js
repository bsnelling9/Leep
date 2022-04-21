const knex = require('knex')(require('../knexfile').development);

exports.playCount = (req, res) => {
    console.log(req.body)
    const newPlaycount = req.body.plays
    const id = req.params.id
    knex('song')
    .where({songid: id})
    .update({plays: newPlaycount})
    .then((data) => {
        console.log(data)
        res.status(201).json({
            message: "Successfully increased playcount",
        })
    })
    .catch((err) => {
        res.status(400).send(`Error increaseing playcount: ${err}`)
    })
}