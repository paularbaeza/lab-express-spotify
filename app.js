require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

 

// require spotify-web-api-node package here:
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));

// Our routes go here:
// const index = require('./routes/index.routes');
// app.use('/', index);

app.get("/", (req,res,next) => {
  res.render("index")
})


app.get("/artist-search", (req,res,next) => {
  //console.log(req.query)
  const {search} = req.query
  //console.log ("búsqueda:",search)
  // const{images} = search.artists.items
  // console.log (images)
  spotifyApi
  .searchArtists(search)
  .then((data) => {
    console.log('The received data from the API: ', data.body.artists.items);
      res.render ("artist-search-results", {
          searchResults: data.body.artists.items
      })
  })
  .catch ((err) => {
      next(err)
      console.log('The error while searching artists occurred: ', err)
  })
})




app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));

