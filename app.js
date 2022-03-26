var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');


// Put these statements before you define any routes.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

    let userData = []

    var connection = mysql.createConnection({
        host     : "elliumearth.cvisdhbbs37x.us-east-1.rds.amazonaws.com",
        user     : "admin",
        password : "SuperUser2022#",
        port     : 3306
    });

app.post('/api/user', function (req, res) {
  try {

    let query = req.body;

    console.log(query.id)

    let sqlQuery = "SELECT * FROM User.User WHERE ID=" + query.id;

  console.log(sqlQuery);

  connection.query(sqlQuery, [true], (error, results, fields) => {
      if (error) {
        console.error(error.message);
      }
      console.log("Results", results);
      console.log(results.length)

      if(results.length == 0) {

        res.send(404, "The user cannot be found")

      }

      else {

        res.send(results)

      }
  });

  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});