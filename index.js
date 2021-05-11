const express = require("express");
const path = require("path");
const dbConfig = require("./dbConfig")

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

var app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at port : ${PORT})`))

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public", "index.html"));
})

app.get("/db", async (req, res) => {
    const POOL = dbConfig.getPool;
    POOL.connect((err, client, release) => {
        if (err) {
            return console.error('Error acquiring client', err.stack)
        }
        client.query('SELECT * FROM public."Recipe" ;', (err, res) => {
            release();
            if (err) throw err;
            for (let row of res.rows) {
              console.log(JSON.stringify(row));
            }
        });
    })
    res.end();
})

 