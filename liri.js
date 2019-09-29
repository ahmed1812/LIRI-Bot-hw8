require("dotenv").config();
var keys = require("./keys.js");
// var moment = require('moment');
var axios = require("axios");
var Spotify = require('node-spotify-api');


var fs = require("fs");
var action = process.argv[2];
var value = process.argv[3];
function startProg(action, value) {

    switch (action) {
        case "concert-this":
            concert(value);
            break;
        case "spotify-this-song":
            song(value);
            break;
        case "movie-this":
            movie(value);
            break;
        case "do-what-it-says":
            console.log("do what it says")
            doWhat(value);
            break;
        default:
            break;
    }
}

startProg(action, value);


function concert(value) {
    //var artist = value;
    axios.get("https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp").then(
        function (response) {
            // console.log( response);
            // for( var i=0; i<response.data.length; i++){
            console.log(response.data[0]);
            // console.log(" Venue location" + response);
            // var time = moment(response).format("MMM Do YY");
            // console.log("Date of the Event" + time);
            // }
        })
        .catch(function (error) {

            console.log(error);
        });
}
//////////////////////////////////////
function movie(value) {
    var movies = value
    if (movies === undefined) {
        movies = "Mr nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + movies + "&apikey=3bae49bd ").then(
        function (response) {
            // console.log( response);
            console.log("Title of the movie: " + response.data.Title);
            console.log("Year the movie came out: " + response.data.Year);
            console.log("IMDB Rating of the movie: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating of the movie: " + response.data.Ratings[1].Value);
            console.log("Country where the movie was produced: " + response.data.Country);
            console.log("Language of the movie: " + response.data.Language);
            console.log(" Plot of the movie: " + response.data.Plot);
            console.log("Actors in the movie: " + response.data.Actors);

        })
        .catch(function (error) {

            console.log(error);
        });

    if (movies === "") {

        console.log("---------------movie---------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");

        console.log("It's on Netflix!");

    };
}
///////////////////////////////////
function song(value) {
    var songName = value;
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    spotify
        .search({ type: 'track', query: songName, limit: 2 })
        .then(function (response) {
            //console.log(JSON.stringify(response.tracks.items[0].name));
            var songs = response.tracks.items;
            for (var i = 0; i < 1; i++) {
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("artist name: " + JSON.stringify(songs[i].artists[0].name));
                console.log("album: " + songs[i].album.name);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

////////////////////////////////////
function doWhat() {

    fs.readFile("random.txt", "utf8", function (error, what) {
        console.log("ehat: " + what);
        var dataArray = what.split(", ");
        console.log("data array: " + dataArray);
        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        // console.log("action: " +dataArray[0]);
        // console.log("value: " +dataArray[1])
        // We will then print the contents of data
      startProg(dataArray[0], dataArray[1]);
    
  });
}