const knex = require('knex')(require('../knexfile').development);
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.login = (req, res) => {
    const { username, password } = req.body;
    knex("profile")
    .where({username: username})
    .then(profiles => {
        const isPasswordCorrect = bcrypt.compareSync(password, profiles[0].password);
        if(isPasswordCorrect) {
            const {password, ...data} = profiles[0]
            const token = jwt.sign({
                profileData: data,
                loginTime: Date.now()
            }, process.env.JWT_SECRET, {expiresIn: '3h'});
            return res.json({token: token});
        } else {
            return res.status(403).json({message: 'Invalid username or password.'});
        }
    })
    .catch(err => {
        console.log(err)
        res.status(401).json({
            message: "Invalid username or password"
        })
    })
}

