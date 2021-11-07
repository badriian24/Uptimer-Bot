const client = require("../index.js");
const config = require("../configs/config.js");

client.on("message", async(message) => {
if(message.author.bot || !message.guild ) return;

const mentionRegex = RegExp(`^<@!?${client.user.id}>$`);
    if(message.content.match(mentionRegex)) {
	return message.channel.send(`Hello ${message.author.username} im a bot for pinging a your project, if you can see command list use \`${config.prefix}help\` for more commands`)
    }
	
  const [cmd, ...args] = message.content
		.slice(config.prefix.length)
		.trim()
		.toLocaleLowerCase()
		.split(" ");

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	if (command) await command.run(client, message, args)
})
