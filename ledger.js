const fs = require('fs');
var db = fs.readFileSync("db.json")
function getUser(name) {
    for(user in db.users) {
        if(user.username == "username") {
            return user;
        }
    }
}
module.exports = function (database) {
   
    const addUser = function (name) {
        db.users.push({
            username: msg.author,
            debts: [],
            balance:0
        })
        fs.writeFileSync("db.json", db);
    }
    const makeGame = function(players,amount,rebuy) {
        db.games.push({
            id:db.currentGameID + 1,
            players:players,
            rebuy:rebuy,
            rebuy_amount:rebuy
        })
        db.currentGameID = db.currentGameID + 1;
        fs.writeFileSync("db.json",db);
    }
    const addDebt = function(name1,name2,amount) {
        var from = getUser(name1);
        var to = getUser(name2);
        from.debts.push(
            {
             debt_to:to.username,
             amount:amount
            }
        )
       
    }
    const 
    
}