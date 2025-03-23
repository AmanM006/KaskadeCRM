console.log("hi")
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

// MySQL Connection

// configurations for creating mysql connection
const connection = mysql.createConnection({
    host: '10.50.2.156',     // host for connection
    port: 3306,            // default port for mysql is 3306
    database: 'cmd',      // database from which we want to connect our node application
    user: 'root',          // username of the mysql connection
    password: 'giri@mysql00'       // password of the mysql connection
});

// executing connection
connection.connect(function(err) {
  if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
  }
  console.log("Connection created with MySQL successfully");
});

/*var sql = "SELECT customer_id, name, email, loyalty_score, category FROM customers";

    connection.query(sql, function (err, results) {
        if (err) {
            console.error("Error executing query:", err);
            return;
        }

        console.log("Customer Data:", results);
    });
*/

//test
//console.log(db)
//test

/*app.get('/data', (req, res) => {
  db.query("SHOW TABLES", (err, tables) => {
    if (err) return res.status(500).send(err);
    
    const promises = tables.map(tableObj => {
      const tableName = tableObj[Object.keys(tableObj)[0]];
      return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM ${tableName}`, (err, results) => {
          if (err) reject(err);
          resolve({ table: tableName, data: results });
        });
      });
    });

    Promise.all(promises)
      .then(data => res.json(data))
      .catch(error => res.status(500).send(error));
  });*/

// Start Server
//app.listen(port, () => console.log(`Server running at http://localhost:${port}`));