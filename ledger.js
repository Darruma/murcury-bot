const fs = require('fs');
var db = JSON.parse(fs.readFileSync("./db.json"));

module.exports = {
    saveDB:function() {
        fs.writeFileSync("./db.json", JSON.stringify(db,null,2));
    },
    deleteAll: function() {
        db.users = []
        module.exports.saveDB();
    },
    getUser: function (name) {
        return db.users.find(user => user.username == name);
    },
    mentionUser:function(id) {
        return "<@" + id + ">"
    },
    addUser: function (id,username) {
        db.users.push({
            name:username,
            username: id,
            debts: [],
            balance: 0
        })
        module.exports.saveDB();
    },
    getBalance: function (id) {
        var user = module.exports.getUser(id);
        if (user == null) {
            return "error"
        }
        var balance =  -1 *Number(module.exports.getUser(id).debts.reduce((acc, val) => acc + val.amount,0));
        balance += Number(db.users.map(user => user.debts.find(debt => debt.debt_to == id)).filter(d => d != null).reduce((acc, val) => acc + val.amount,0));
        console.log(balance);
        return balance;
    },
    getDebts: function () {
        debts = "----------------- \n"
        for (var i = 0; i < db.users.length; i++) {
            for (var j = 0; j < db.users[i].debts.length; j++) {
                var debt = db.users[i].debts[j];
                debts += module.exports.mentionUser(db.users[i].username) + " -> " + module.exports.mentionUser(debt.debt_to) + " £" + debt.amount + "\n";
            }
        }
        return debts;
    },
    addDebt: function (name1, name2, amount) {
        var from = module.exports.getUser(name1);
        var to = module.exports.getUser(name2);
        if (from == null || to == null) {
            return;
        }
        var already_debt = false;
        for (var i = 0; i < from.debts.length; i++) {
            var debt_obj = from.debts[i];
            if (debt_obj.debt_to == to) {
                already_debt = true;
                debt_obj.amount = debt_obj + amount;
            }
        }
        if (already_debt == false) {
            from.debts.push(
                {
                    debt_to: to.username,
                    amount: amount
                }
            )
        }

        module.exports.saveDB();
    },
    deleteDebt: function (name1, name2) {
        var from = module.exports.getUser(name1);
        var to = module.exports.getUser(name2);
        if (from == undefined || to == undefined) {
            console.log("error");
            return;
        }
        for (let i = 0; i < from.debts.length; i++) {
            if (from.debts[i].debt_to == to.username) {
                from.debts = from.debts.splice(i);
                console.log(debts);
            }
        }
        module.exports.saveDB();
    },
}