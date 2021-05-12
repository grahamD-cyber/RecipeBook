const express = require('express'); // import express module (simplifies routing/requests, among other things)
const cors = require('cors'); // import the CORS library to allow Cross-origin resource sharing
const app = express(); // create an instance of the express module (app is the conventional variable name used)
const path = require("path");

const services = require("./services/api")

const PORT = process.env.PORT || 5000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(cors()); // Enable CORS 
app.use(express.json()); // Recognize Request Objects as JSON objects
app.use(express.static("build"));		//load the front-end from public folder
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/db", async (req, res) => {
    services.searchRecipeByName('Chicken').then(result => {
        console.log(result);
        res.end();
    }).catch(err => {
        console.log(err);
    });
});
 
app.listen(PORT, () => console.log(`Server running at port : ${PORT})`))