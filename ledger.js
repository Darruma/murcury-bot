const fs = require('fs');
var db = JSON.parse(fs.readFileSync("./db.json"));

module.exports = {
    saveDB:function() {
        fs.writeFileSync("./db.json", JSON.stringify(db));
    },
    deleteAll: function() {
        db.users = []
        saveDB();
    },
    getUser: function (name) {
        db.users.find(user => user.username == name);
        return null;
    },
    mentionUser:function(id) {
        return "<@" + id + ">"
    },
    addUser: function (name) {
        db.users.push({
            username: name,
            debts: [],
            balance: 0
        })
        saveDB();
    },
    getBalance: function (id) {
        var user = getUser(id);
        if (user == null) {
            return "error"
        }
        var balance = getUser(id).debts.reduce((acc, val) => acc + val.amount);
        balance += db.users.map(user => user.debts.find(debt => debt.debt_to == id)).reduce((acc, val) => acc + val);
        return balance;
    },
    getDebts: function () {
        debts = "----------------- \n"
        for (var i = 0; i < db.users.length; i++) {
            for (var j = 0; j < db.users[i].debts.length; j++) {
                var debt = db.users[i].debts[j];
                debts += mentionUser(db.users[i].username) + " -> " + mentionUser(debt.debt_to) + "£" + debt.amount + "\n";
            }
        }
        return debts;
    },
    addDebt: function (name1, name2, amount) {
        var from = getUser(name1);
        var to = getUser(name2);
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

        saveDB();
    },
    deleteDebt: function (name1, name2) {
        var from = getUser(name1);
        var to = getUser(name2);
        if (from == undefined || to == undefined) {
            return;
        }
        for (let i = 0; i < from.debts.length; i++) {
            if (from.debts[i].debt_to == to.username) {
                from.debts = from.debts.splice(i);
            }
        }
        saveDB();
    },
}