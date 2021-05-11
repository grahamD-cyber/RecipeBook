const express = require("express");
const path = require("path");
const { Client } = require('pg');

var app = express();

app.listen(process.env.PORT || 5000, () => console.log("Server running..."));

app.use(express.static("public"));

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  

app.get("/", (req, res) => {
    res.sendFile(path.resolve("public", "index.html"));
})

app.get("/db", (req, res) => {
    client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          console.log(JSON.stringify(row));
        }
        client.end();
    });
})

 