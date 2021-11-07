const { MessageEmbed } = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");

module.exports = {
	name: "stats",
run: async(client, message, args) => {
	let data = JSON.parse(fs.readFileSync("./link.json", "utf8"));

    if (!data) return message.channel.send(client.emotes.error + " **Something went wrong...**");

    data = data.find(x => x.id === message.author.id);

    if (!data) {
      return message.channel.send(
        client.emotes.error + " You do not have any site to monitor, use `up.monitor` too add a website"
      );
    }

    let embed = new MessageEmbed()
      .setAuthor(`You have ${data.link.length} Website`, message.author.displayAvatarURL())
			.setThumbnail(message.author.displayAvatarURL())
      .setColor(client.embedcolor)
      .setDescription(
        `**• ${data.link.join(`\n• `)}**`
      );

    message.reply(client.emotes.yes+ " **Check Your DM's**");
    message.author.send(embed).catch(err => {
      return message.channel.send(
        "Your dms are disabled so, please enable to get stats"
      );
    });
}
}