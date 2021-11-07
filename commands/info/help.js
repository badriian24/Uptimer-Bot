const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "help",
aliases: ["h", "cmd"],
run: async(client, message, args) => {
	const help = new MessageEmbed()
	.setAuthor(`help`, client.user.displayAvatarURL())
	.setDescription(`**This is all my command list**`)
.setThumbnail(client.user.displayAvatarURL())
		.setColor(client.embedcolor)
		.addField(`> Info`, '`help`, `ping`, `uptime`')
	.addField(`> Monitoring`, '`monitor`, `remove`, `total`')
	.setFooter(client.user.username)
.setTimestamp()
	message.channel.send(help)
}
}
