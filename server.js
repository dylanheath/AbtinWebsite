var express = require("express");
var app = express();
const path = require("path");

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

app.use(express.static(path.join(__dirname, "public")));

app.listen(8080);
console.log("Server is listening on port 8080");
