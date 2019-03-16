const fs = require('fs');
var db = JSON.parse(fs.readFileSync("./db.json"));
function saveDB(){
    fs.writeFileSync("./db.json", JSON.stringify(db));
}
function getUser(name) {
    console.log(name);
    for(var i =0 ;i < db.users.length;i++){
        if(db.users[i].username == name) {
            return db.users[i];
        }
    }
}
module.exports = {
   
    addUser:function (name) {
        db.users.push({
            username:name,
            debts: [],
            balance:0
        })
        saveDB();
    },
    makeGame:function(players,amount,rebuy) {
        db.games.push({
            id:db.currentGameID + 1,
            players:players,
            rebuy:rebuy,
            rebuy_amount:rebuy
        })
        db.currentGameID = db.currentGameID + 1;
        saveDB();
    },
    addDebt:function(name1,name2,amount) {
        var from = getUser(name1);
        var to = getUser(name2);
        from.debts.push(
            {
             debt_to:to.username,
             amount:amount
            }
        )
        saveDB();
    }
    
}