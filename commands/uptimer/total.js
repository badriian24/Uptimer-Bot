const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

let count = 0;
let invcount = 0;
let user = 0;
let rounds = 0;

module.exports = {
	name: "total",
run: async(client, message, args) => {

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
	
	const totall = new MessageEmbed()
	.setAuthor(`Total`, client.user.displayAvatarURL())
	.setDescription(`**Websites:** ${count}\n**Invalid Websites:** ${invcount}\n**Users:** ${user}\n**Fetch Number:** ${rounds}`)
.setThumbnail(client.user.displayAvatarURL())
		.setColor(client.embedcolor)
	.setFooter(client.user.username)
.setTimestamp()
	message.channel.send(totall)
}
}
