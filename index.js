const PORT = process.env.PORT || 5000;
const express = require("express");
const INDEX = "public/index.html";
const BROWSE = "public/browse.html";
const RECIPEPAGE = "public/recipePage.html";
const ADDRECIPE = "public/addRecipe.html";
const SEARCHRESULTS = "public/searchResults.html";

var app = express();
var server = app.listen(PORT, () => {
    console.log(`Recipe Book is running on port ${PORT}`);
  
  });

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(INDEX, { root: __dirname });
});
app.get("/search", (req, res) => {
    res.sendFile(SEARCHRESULTS, { root: __dirname });
});
app.get("/browse", (req, res) => {
    res.sendFile(BROWSE, { root: __dirname });
});
app.get("/recipe", (req, res) => {
    res.sendFile(RECIPEPAGE, { root: __dirname });
});
app.get("/add", (req, res) => {
    res.sendFile(ADDRECIPE, { root: __dirname });
});
