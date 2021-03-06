const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var id_regex = new RegExp(/<@!?(1|\d{17,19})>/g);
const ledger = require('./ledger.js')
require('dotenv').config()
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

  if (msg.content === '!poker') {
    msg.channel.send(msg.author + "wants to play poker");
  }
  if (msg.content === "!registerall") {
    console.log(msg.guild.members);
    msg.guild.members.forEach(member => ledger.addUser(member.user.id, member.user.username));
  }
  else if (msg.content === "!balance") {
    msg.channel.send("Your balance is £" + ledger.getBalance(msg.author.id));
  }
  else if (msg.contet === "!deleteall") {
    ledger.deleteAll();
  }
  else if (msg.content === "!registeruser") {
    console.log(msg.content);
    msg.channel.send(msg.author + " joined poker")
    ledger.addUser(msg.author.id);
  }

  else if (msg.content.includes("!debtadd")) {
    const ids = getIDs(msg.content);
    var amount = msg.content.slice(msg.content.indexOf("!debtadd") + 8).split(" ").filter(i => i != "").map(e => e.toString())[2];
    ledger.addDebt(ids[0], ids[1], amount);
  }
  else if (msg.content === "!debts") {
    msg.channel.send(ledger.getDebts());
  }
  else if (msg.content.includes("!debtdelete")) {
    const ids = getIDs(msg.content);
    ledger.deleteDebt(ids[0], ids[1]);
  }
});
function getIDs(content) {
  var result
  var ids = [];
  while (result = id_regex.exec(content) !== null) {
    ids.push(result[0]);
  }
  return ids;
}
client.login(process.env.DISCORD_TOKEN);
const guild = client.guilds;
console.log(guild);
