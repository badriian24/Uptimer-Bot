module.exports = {
	name: "ping",
	run: async(client, message, args) => {
message.channel.send(`**Ping:** \`${client.ws.ping} ms\``)
}
}