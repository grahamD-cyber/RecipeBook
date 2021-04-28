const PORT = process.env.PORT || 5000;
const express = require("express");
const INDEX = "public/index.html";

var app = express();
var server = app.listen(PORT, () => {
    console.log(`Recipe Book is running on port ${PORT}`);
  
  });

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(INDEX, { root: __dirname });
  });

