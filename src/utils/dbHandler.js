const mysql = require('mysql')
var dbConnect = require('../../jsons/dbConnect.json');
const connection = mysql.createConnection(dbConnect);

const users = {
  drop: `DROP TABLE IF EXISTS users`,
  create: `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    username VARCHAR(100) NOT NULL, 
    password VARCHAR(30) NOT NULL
    );`,
  insert: (username, password) => {
    return "INSERT INTO users (username,password) VALUES (\'" + username + "\',\'" + password + "\');"
  },
  selectAll: 'SELECT * FROM users'
}

// connection.query(users.drop, function (error, result) {
//   if (error) throw error
//   connection.query(users.create, function (error, result) {
//     if (error) throw error
//     connection.query(users.insert('sasko@icloud.com', 'Oo0!kjhgf'), function (error, result) {
//       if (error) throw error
//       connection.query(users.selectAll, function (error, result) {
//         if (error) throw error
//         console.log(result)
//       })
//     })
//   })
// })

function insertUser(username, password, callback) {
  connection.query(users.insert(username, password), function (error, result) {
    if (error) throw error
    getUsers(callback)
  });
}

function getUsers(callback) {
  connection.query(users.selectAll, function (error, result) {
    if (error) throw error
    var users = {}
    result.forEach(element => {
      users[element.username] = {
        "password": element.password
      }
    });
    callback(users);
  })
}

module.exports.insertUser = insertUser
module.exports.getUsers = getUsers
