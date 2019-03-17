const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const ledger = require('./ledger.js')
const token = "NTU2NTgyMjM2NjgyNDUyOTkz.D28Wpw.QUZ2edYBzsvdZWWSVEuX_8TIYJA"

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === '!poker') {
    console.log(msg.content);
    msg.channel.send(msg.author + "wants to play poker" );
    
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
    var args = msg.content.slice(msg.content.indexOf("!debtadd") + 8).split(" ").filter(i => i != "").map(e => e.toString());
    ledger.addDebt(ids[0],ids[1],args[2]);
    
  }
  if(msg.content === "!debts") {
    msg.channel.send(ledger.getDebts());
  }
  if(msg.content === "!debtdelete") {
    const ids = msg.mentions.members.keyArray();
    ledger.deleteDebt(ids[0],ids[1]);
  }
});

client.login(token);
