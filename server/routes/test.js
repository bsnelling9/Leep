const knex = require('knex')(require('../knexfile').development);
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const FileType = require('file-type');

router.post('/', (req, res) => {
    const {name, data} = req.files.file;
    if (name && data) {
        knex("test")
        .insert({id: uuidv4(), name: name, img: data})
        // .into('test')
        .then((data) => {
            console.log(data)
            res.status(201).json({
                message: "file uploaded",
            })
        })
        .catch((err) => {
            res.status(400).send(`error editing profile: ${err}`)
        })
    } else {
        res.sendStatus(400);
    }

})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    console.log('test')
    const img = await knex('test').where({id: id}).first();
    console.log(img)
    if (img) {
        console.log(img.img)
        const contentType = await FileType.fromBuffer(img.img); // get the mimetype of the buffer (in this case its gonna be jpg but can be png or w/e)
        console.log(contentType)
        res.type(contentType.mime); // not always needed most modern browsers including chrome will understand it is an img without this
        res.end(img.img);
    } else {
        res.end('No Img with that Id!');
    }
})
module.exports = router;