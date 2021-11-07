const client = require("../index");
const fs = require("fs");
const fetch = require("node-fetch");

let count = 0;
let invcount = 0;
let user = 0;
let rounds = 0;

setInterval(function() {
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
  console.log("\x1b[36m", "Ping a monitor")
	client.user.setActivity(`Monitoring ${count} Website`, {
		type: "WATCHING"
	});
}, 10000);
//240000