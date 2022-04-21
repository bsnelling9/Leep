const knex = require('knex')(require('../knexfile').development);

exports.artistprofile = (req, res) => {
    knex('profile')
    .where({username: req.params.id})
    .then(data => {
        res.json.data
    })
    .catch(err => {
        res.status(400).send(`Ran into an error getting item in collection: ${err}`)
    })
}