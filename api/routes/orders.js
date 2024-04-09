let express = require('express');
let router = express.Router();
const sqlite3 = require('sqlite3').verbose()

/* GET users listing. */
let db = new sqlite3.Database('/Users/adamswain/DataGripProjects/SchoolProject/identifier.sqlite', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

db.all(`SELECT * FROM orders`, (err, row) => {
    if (err) {
        return console.error(err.message);
    }
    router.get('/', function(req, res, next) {
        res.send(row);
    });
});
module.exports = router;
