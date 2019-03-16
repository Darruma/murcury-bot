const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const ledger = require('./ledger.js')
const token = "NTU2NTgyMjM2NjgyNDUyOTkz.D271QA.dxMf3YzvXZkq2sl5V8JxPRbFtgo"
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!poker') {
    msg.channel.send(msg.author + "wants to play poker" );
  }
  if(msg.content === "!registerpoker") {
      msg.channel.send(msg.author + " joined poker")
      ledger.addUser(msg.author);
  }
});

client.login(token);
