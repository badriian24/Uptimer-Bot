const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

module.exports = {
	name: "remove",
	run: async(client, message, args) => {
		let database = JSON.parse(fs.readFileSync("./link.json", "utf8"));
    if (!database) return message.channel.send("Something went wrong...");

    let data = database.find(x => x.id === message.author.id);

    if (!data) {
      return message.channel.send(
        client.emotes.error + " You do not have any site to monitor, use `up.monitor` too add a website"
         );
    }
    let value = database.indexOf(data);
    let array = [];
    database[value].link.forEach((m, i) => {
      array.push(`\`[${i + 1}]\` • **${m}\**`);
    });

    let embed = new MessageEmbed()
      .setTitle("Send The number of the link to remove")
      .setColor(client.embedcolor)
      .setDescription(array.join("\n"));

    const msg = await message.channel.send(embed);

    let responses = await message.channel.awaitMessages(
      msg => msg.author.id === message.author.id,
      { time: 300000, max: 1 }
    );
    let repMsg = responses.first();

    if (!repMsg) {
      msg.delete();
      return message.channel.send(
        client.emotes.error + " **Cancelled The Process of deleting monitor website.**",
        );
    }

    if (isNaN(repMsg.content)) {
      msg.delete();
      return message.channel.send(
        client.emotes.error + " Cancelled The Process of deleting monitor website due to **invalid digit**",
        );
    }

    if (!database[value].link[parseInt(repMsg.content) - 1]) {
      msg.delete();
      return message.channel.send(client.emotes.error + " There is no link exist with this number.");
    }

    if (database[value].link.length === 1) {
      delete database[value];

      var filtered = database.filter(el => {
        return el != null && el != "";
      });

      database = filtered;
    } else {
      delete database[value].link[parseInt(repMsg.content) - 1];

      var filtered = database[value].link.filter(el => {
        return el != null && el != "";
      });

      database[value].link = filtered;
    }

    fs.writeFile("./link.json", JSON.stringify(database, null, 2), err => {
      if (err) console.log(err);
    });

    repMsg.delete();
    msg.delete();


	const hooooora = new MessageEmbed()
	.setTitle(client.emotes.yes + ` Success`)
.setDescription(`Removed the website from monitoring, you can check website using \`up.stats\``)
	.setColor(client.embedcolor)
.setTimestamp()
    return message.channel.send(
      hooooora
    );
	}
}