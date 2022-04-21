const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5050;
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');

//use express static folder
app.use(express.static("./public"))
 
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))



const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const artistRoutes = require('./routes/artistroutes');
const homeRoutes = require('./routes/homeroutes');
const uploadArtist = require('./routes/uploadArtist')
const chartRoutes = require('./routes/chartsRoutes')
const uploadSongs = require('./routes/uploadSongs')
const userProfile = require('./routes/userProfile')
const artistProfile = require('./routes/artistprofile')
const songData =  require('./routes/songDataRoutes')
const genre = require('./routes/genre')

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use('/artist', artistRoutes);
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/home', homeRoutes)
app.use('/upload', uploadArtist);
app.use('/charts', chartRoutes);
app.use('/uploadsongs', uploadSongs);
app.use('/profile', userProfile);
app.use('/artistprofile', artistProfile);
app.use('/songdata', songData)
app.use('/genre', genre)


app.listen(PORT, () => {
    console.log(`Hello! My server is listening on ${PORT}`);
});