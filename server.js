var express = require("express");
var app = express();
const path = require("path");
const mongoose = require("mongoose")
const Launch = require("./model/launches")
require('dotenv').config();

const uri = process.env.MONGODB_CONNECTION_STRING

mongoose.connect(uri, {
  dbName: 'Launches'
})

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection open")
})

// set the view engine to ejs
app.set("view engine", "ejs");

// use res.render to load up an ejs view file

// index page
app.get("/", function (req, res) {
  res.render("pages/index");
});

// about page
app.get("/about", function (req, res) {
  res.render("pages/about");
});

//falcon9 page
app.get("/falcon9", function (req, res) {
  res.render("pages/falcon9");
});

//falcon heavy page
app.get("/falcon-heavy", function (req, res) {
  res.render("pages/falcon-heavy");
});

//upcoming launches page
app.get("/upcoming-flights", async function (req, res) {
  await Launch.find().then((data) => {
    console.log(data)
    res.render("pages/upcoming-flights", {LaunchDataArray: data});
   })
});

app.get("/get-upcoming-flights", async function (req, res) {
    await Launch.find().then((data) => {
      res.send(data)
     })
})
//dragon page
app.get("/dragon", function (req, res) {
  res.render("pages/dragon");
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(8080);
console.log("Server is listening on port 8080");
