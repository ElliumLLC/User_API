var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyParser = require('body-parser');


// Put these statements before you define any routes.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

async function getQuery(query) {

  let userData = []

  var connection = mysql.createConnection({
      host     : process.env.HOST,
      user     : process.env.USER_NAME,
      password : process.env.PASSWORD,
      port     : process.env.PORT
    });

  connection.connect(function(err) {
      if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
      }
    
      console.log('Connected to database.');
    });

let sqlQuery = "SELECT * FROM User.User WHERE ID=" + query.id;

console.log(sqlQuery);

connection.query(sqlQuery, [true], (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);

    Object.keys(result).forEach(function(key) {
      var row = result[key];
      //console.log(row.name)
      userData.push(row)
    });

});

return userData;

  //connection.end();

}

app.post('/', async function (req, res) {
  try {

    let query = req.body;

    console.log(query.id)

    let userDetails = await getQuery(query)

    res.send(userDetails);

  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});