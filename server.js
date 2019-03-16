const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const ledger = require('./ledger.js')
const token = "NTU2NTgyMjM2NjgyNDUyOTkz.D271QA.dxMf3YzvXZkq2sl5V8JxPRbFtgo"

function between_str(string ,str1,str2 ) {
  string.substring(
    str.lastIndexOf(str1) + 1, 
    str.lastIndexOf(str2)
);
}
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
    console.log(ids);
    var args = msg.content.slice(msg.content.indexOf("!debtadd") + 8).split(" ").filter(i => i != "").map(e => e.toString());
    ledger.addDebt(ids[0],ids[1],args[2]);
    msg.channel.send("<@" + ids[0] + "> -> <@" + ids[1] + "> £" + args[2]);
  }
});

client.login(token);
