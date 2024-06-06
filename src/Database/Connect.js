var mysql = require('mysql');
var connection = mysql.createConnection({
host	 :'localhost',
database :'project_1',
user	 :'root',
password :'root12345',
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL server');
});