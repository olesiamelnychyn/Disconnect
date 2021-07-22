const mysql = require('mysql')
var dbConnect = require('../../jsons/dbConnect.json');
const connection = mysql.createConnection(dbConnect);

const users = {
  drop: `DROP TABLE IF EXISTS users`,
  create: `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    username VARCHAR(100) NOT NULL,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL, 
    password VARCHAR(30) NOT NULL
    );`,
  insert: (username, firstName, lastName, password) => {
    return "INSERT INTO users (username, firstName, lastName, password) VALUES (\'" + username + "\',\'" + firstName + "\',\'" + lastName + "\',\'" + password + "\');";
  },
  selectAll: 'SELECT * FROM users',
  deleteUser: (username) => { return "DELETE FROM users WHERE username=\'" + username + "\';" }
}

// connection.query(users.drop, function (error, result) {
//   if (error) throw error
//   connection.query(users.create, function (error, result) {
//     if (error) throw error
//     connection.query(users.insert('sasko@icloud.com', "Dominik", "Sasko", 'Oo0!kjhgf'), function (error, result) {
//       if (error) throw error
//       connection.query(users.insert('melnuchun@icloud.com', "Olesia", "Melnychyn", 'nN8*jkjhghj'), function (error, result) {
//         if (error) throw error
//         connection.query(users.selectAll, function (error, result) {
//           if (error) throw error
//           console.log(result)
//         })
//       })
//     })
//   })
// })

function insertUser(username, firstName, lastName, password, callback) {
  connection.query(users.insert(username, firstName, lastName, password), function (error, result) {
    if (error) throw error
    getUsers(callback)
  });
}

function deleteUser(username, callback) {
  connection.query(users.deleteUser(username), function (error, result) {
    if (error) throw error
    console.log(result)
    getUsers(callback)
  });
}

function getUsers(callback) {
  connection.query(users.selectAll, function (error, result) {
    if (error) throw error
    var users = {}
    result.forEach(element => {
      users[element.username] = {
        "firstName": element.firstName,
        "lastName": element.lastName,
        "password": element.password
      }
    });
    callback(users);
  })
}

module.exports.insertUser = insertUser
module.exports.getUsers = getUsers
module.exports.deleteUser = deleteUser
