const knex = require('knex')(require('../knexfile').development);
const { v4: uuidv4 } = require('uuid');

exports.profile = (req, res) => {
    const { username, password, email} = req.body;
    knex("profile")
    .insert({
        userid: uuidv4(),
        username,
        password,
    })
    // .where("profile")
    .then((data) => {
        console.log(data)
        res.status(201).json({
            message: "User successfully signed up",
            data
        })
    })
    .catch((err) => {
        res.status(400).send(`Error signing up new user: ${err}`)
    })
}