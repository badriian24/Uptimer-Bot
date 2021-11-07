const discord = require("discord.js");
const { Client, Collection, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const fs = require("fs");



const config = require("./configs/config.js");
const prefix = config.prefix;



const client = new Client({
	disableMention: 'everyone'
});
require('discord-buttons')(client);



module.exports = client;
client.prefix = prefix;
client.commands = new Collection();
client.aliases = new Collection();
client.Timeout = new Collection();
client.emotes = require("./configs/emotes.js");
client.embedcolor = config.embedcolor;



require("./structure/interval.js")
require("./structure/website.js")
require("./structure/reply.js")
require("./handler")(client);



client.login(process.env.TOKEN);