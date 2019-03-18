const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const ledger = require('./ledger.js')
require('dotenv').config()
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!poker') {
    msg.channel.send(msg.author + "wants to play poker" );
  }
  if(msg.content === "!balance"){
    msg.channel.send("Your balance is £" + ledger.getBalance(msg.author.id));
  }
  if(msg.content === "!registerpoker") {
      console.log(msg.content);
      msg.channel.send(msg.author + " joined poker")
      ledger.addUser(msg.author.id);  
  }
  if(msg.content === "!userbalances"){
    msg.channel.send(ledger.getDebts());
  }
  if(msg.content.includes("!debtadd"))
  {
    const ids = msg.mentions.members.keyArray();
    var amount = msg.content.slice(msg.content.indexOf("!debtadd") + 8).split(" ").filter(i => i != "").map(e => e.toString())[2];
    ledger.addDebt(ids[0],ids[1],amount);
  }
  if(msg.content === "!debts") {
    msg.channel.send(ledger.getDebts());
  }
  if(msg.content === "!debtdelete") {
    const ids = msg.mentions.members.keyArray();
    ledger.deleteDebt(ids[0],ids[1]);
  }
});

client.login(process.env.DISCORD_TOKEN);
