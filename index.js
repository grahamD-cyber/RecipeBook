const express = require("express");
const path = require("path");

var app = express();

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

app.use(express.static("public"));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve("public", "index.html"));
})


 