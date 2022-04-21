const knex = require('knex')(require('../knexfile').development);
const router = require('express').Router();
const profileController = require('../controllers/profileController');
const { v4: uuidv4 } = require('uuid');
const FileType = require('file-type');


router.get('/following/:username', profileController.profileFollowing)

router.get('/recent/:id', profileController.recentsongs)


router.post('/upload-song', (req, res) => {
    const cover = req.files.file.data
    const songname = req.body.string[0]
    const genre = req.body.string[1]
    const username = req.body.string[2]
    const artistid = req.body.string[3]
    const timestampInt = + new Date()
    const timestamp = JSON.stringify(timestampInt)
    knex("song")
    .insert({songid: uuidv4(), genre: genre, songname: songname, username: username, profile_username:username, artistid: artistid, timestamp: timestamp, songcover: cover})
    .then((data) => {
        res.status(201).json({
            message: "file uploaded",
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(400).send(`error editing profile: ${err}`)
    })
})

router.post('/banner', (req, res) => {
    const banner = req.files.banner.data
    const username = req.body.string[0]
    const userid = req.body.string[1]
    knex('profile_pic')
    .insert({bannerid:  uuidv4(), username: username, userid: userid, banner: banner})
    .then((data) => {
        res.status(201).json({
            message: "file uploaded",
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(400).send(`error editing profile: ${err}`)
    })
})
router.get('/banner/:id', profileController.getBanner)

router.patch('/edit', (req, res) => {
    const {username, summary, bio, tag} = req.body;
    knex("profile")
    .update({summary: summary, content: bio, tag: tag})
    .where({username: username})
    .then((data) => {
        res.status(201).json({
            message: "Successfully updated profile",
            data
        })
    })
    .catch((err) => {
        console.log(err)
        res.status(400).send(`error editing profile: ${err}`)
    })
})

router.get('/updated/:profile', (req, res) => {
    knex('profile')
    .where({username: req.params.profile})
    .first()
    .then(result => {
        res.json(result);
    })
    .catch(err => {
        console.log(err)
    })
})

module.exports = router;