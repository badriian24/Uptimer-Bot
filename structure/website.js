const http = require("http");
const express = require("express");
const app = express();
var server = http.createServer(app);
const bodyParser = require("body-parser");
const fs = require("fs");
const fetch = require("node-fetch");

app.use(express.static("public"));

app.use(bodyParser.json());

let count = 0;
let invcount = 0;
let user = 0;
let rounds = 0;

app.get("/", async (request, response) => {

let database = JSON.parse(fs.readFileSync("./link.json", "utf8"));
  count = 0;
  invcount = 0;
  user = database.length;
  rounds++;

  database.forEach(m => {
    m.link.forEach(s => {
      count++;

      fetch(s).catch(err => {
        invcount++;
      });
    });
  });
	
  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end(
    `Monitoring ${count} websites and ${invcount} Invalid website with ${user} Users, Fetch Number : ${rounds}`
  );
});

const listener = server.listen(3000, function() {
  console.log("\x1b[34m",`Your app is listening on port ` + listener.address().port);
});