require("dotenv").config();
var keys = require("./keys.js");
var moment = require('moment');
var axios = require("axios");
var Spotify = require('node-spotify-api');


var fs = require("fs");
var action = process.argv[2];
var value = process.argv[3];


//function startProg(action, value) {

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

        doWhat(value);
        break;
    default:
        break;
}
//}

//startProg(action, value);


function concert(value) {
    var artist = value;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
            // console.log(response.data);
            var result = response.data;
            for (var i = 0; i < result.length; i++) {

                var time = moment(result[i].datetime).format('L');
                console.log(i + ":", result[i].venue.name + ",", result[i].venue.city, ",", time);
            }
        })
        .catch(function (error) {

            console.log(error);
        });
}
//////////////////////////////////////
function movie(value) {
    var movies = value;

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
    if (movies === undefined) {
        movies = "Mr nobody";
        console.log("---------------movie---------------");
        console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");

        console.log("It's on Netflix!");

    }

}
///////////////////////////////////
function song(value) {
    var songName = value;
    var spotify = new Spotify({
        id: keys.spotify.id,
        secret: keys.spotify.secret
    });
    if (songName === undefined) {
        songName = "The Sign"
    }

    spotify
        .search({ type: 'track', query: songName })
        .then(function (response) {
            // console.log(response.tracks.items[1].preview_url);
            var songs = response.tracks.items;
            for (var i = 0; i < songs.length; i++) {
                console.log("-----------------------------------------");
                console.log(i)
                console.log("Artist :" + songs[i].artists[0].name);
                console.log("The song's name : " + songs[i].name);
                console.log("preview link : " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
            }

        })
        .catch(function (err) {
            console.log(err);
        });

}

////////////////////////////////////
function doWhat() {

    fs.readFile("random.txt", "utf8", function (error, data) {


        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }
        console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");


        var action = dataArr[0];
        var value = dataArr[1];
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

            default:
                break;
        }
    });
}