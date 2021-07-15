
const mysql = require('mysql')
const fs = require('fs');
var nodemailer = require("nodemailer");

const express = require("express");
const app = express();
app.use(express.static('public'));

const fileName = './jsons/users.json';
var DB = require(fileName);
var smtp = require('./jsons/smtp.json');

smtpTransport = nodemailer.createTransport(smtp);
var unverifiedUsers = {}, host, link;

function clearRand() {
  for (const [key, value] of Object.entries(unverifiedUsers)) {
    unverifiedUsers[key].active_time++
    if (unverifiedUsers[key].active_time == 3600) {
      delete unverifiedUsers[key]
      console.log("clear:" + key)
    }
  }
  setTimeout(clearRand, 1000);
}

setTimeout(clearRand, 1000);

// var connection;


// var db_schema = [`
// START TRANSACTION;
// DROP DATABASE IF EXISTS vavjs3;
// CREATE DATABASE vavjs3;
// USE vavjs3;
// COMMIT;`,
//   `START TRANSACTION;
// DROP TABLE IF EXISTS customer;
// CREATE TABLE customer (
//   id int(11) NOT NULL AUTO_INCREMENT,
//   username varchar(30) COLLATE utf8_unicode_ci NOT NULL,
//   city varchar(30) COLLATE utf8_unicode_ci NOT NULL,
//   street varchar(30) COLLATE utf8_unicode_ci NOT NULL,
//   number int(11) NOT NULL,
//   postcode varchar(6) COLLATE utf8_unicode_ci NOT NULL,
//   PRIMARY KEY (id)
// );
// INSERT INTO customer (id, username, city, street, number, postcode) VALUES (1, 'joshall', 'Greenside', 'Kyle Mill', 98, '22806');
// INSERT INTO customer (id, username, city, street, number, postcode) VALUES (2, 'alfredo80', 'South Alfordhaven', 'Price Oval', 58, '66259');
// INSERT INTO customer (id, username, city, street, number, postcode) VALUES (3, 'kieran01', 'Farrellchester', 'Kirk Hollow', 12, '68053');
// COMMIT;`,
//   `START TRANSACTION;
// DROP TABLE IF EXISTS product;

// CREATE TABLE product (
//   id int(11) NOT NULL AUTO_INCREMENT,
//   title varchar(30) COLLATE utf8_unicode_ci NOT NULL,
//   image varchar(250) COLLATE utf8_unicode_ci NOT NULL,
//   price decimal(10,2) NOT NULL,
//   PRIMARY KEY (id)
// );
// INSERT INTO product (id,title,image,price) VALUES (1, 'Rose', 'https://cdn.pixabay.com/photo/2014/04/10/11/35/rose-320891_1280.jpg', '13.00');
// INSERT INTO product (id,title,image,price) VALUES (2, 'Daffodil', 'https://cdn.pixabay.com/photo/2012/09/08/22/15/flower-56420_1280.jpg', '10.80');
// INSERT INTO product (id,title,image,price) VALUES (3, 'Tulip', 'https://cdn.pixabay.com/photo/2018/07/04/01/15/tulip-3515181_1280.jpg', '11.50');
// COMMIT;`,
//   `START TRANSACTION;
// DROP TABLE IF EXISTS orders;

// CREATE TABLE orders (
//   id int(11) NOT NULL AUTO_INCREMENT,
//   customer_id int(11) NOT NULL,
//   state enum('approved','payed') COLLATE utf8_unicode_ci NOT NULL,
//   PRIMARY KEY (id)
// );
// INSERT INTO orders (id, customer_id, state) VALUES (1, 1, 'approved');
// INSERT INTO orders (id, customer_id, state) VALUES (2, 2, 'payed');
// INSERT INTO orders (id, customer_id, state) VALUES (3, 3, 'approved');
// INSERT INTO orders (id, customer_id, state) VALUES (4, 1, 'payed');
// COMMIT;`,
//   `START TRANSACTION;
// DROP TABLE IF EXISTS order_product;

// CREATE TABLE order_product (
//   id int(11) NOT NULL AUTO_INCREMENT,
//   order_id int(11) NOT NULL,
//   product_id int(11) NOT NULL,
//   amount int(11) NOT NULL,
//   PRIMARY KEY (id)
// );
// INSERT INTO order_product (id, order_id, product_id, amount) VALUES (1, 1, 1, 1);
// INSERT INTO order_product (id, order_id, product_id, amount) VALUES (2, 2, 2, 62);
// INSERT INTO order_product (id, order_id, product_id, amount) VALUES (3, 3, 3, 15);
// INSERT INTO order_product (id, order_id, product_id, amount) VALUES (4, 1, 2, 25);
// INSERT INTO order_product (id, order_id, product_id, amount) VALUES (5, 2, 1, 46);
// INSERT INTO order_product (id, order_id, product_id, amount) VALUES (6, 4, 3, 10);
// COMMIT;`,
//   `START TRANSACTION;
// DROP TABLE IF EXISTS counter;
// CREATE TABLE counter (
//   count int(11) NOT NULL
// );
// INSERT INTO counter (count) VALUES (0);
// COMMIT;
// `]

// function tryDB(callback) {
// connection = mysql.createConnection(dbConnect);
//   connection.connect(function (err) {
//     if (err) {
//       connection.end();
//       console.log("Problems with DB, i will try again in 15 seconds!")
//       setTimeout(() => {
//         tryDB(callback)
//       }, 15000);
//     } else {
//       setDB(() => {
//         callback();
//       });
//     }
//   });
// }

// function setDB(callback) {
//   for (let i = 0; i < db_schema.length; i++) {
//     connection.query(db_schema[i], function (error, results, fields) {
//       if (error) throw error;
//       // var title=db_schema[i].split(";")[0].split(" ")[4];
//       // if (i) {
//       //   console.log(`Table ${title.toUpperCase()} with ${amount[title]} row(s) was created!`);
//       // } else{
//       //   console.log("Database " + title.toUpperCase()+" was created!");
//       // }
//       if (i == db_schema.length - 1) {
//         callback();
//       }
//     });
//   }
// }

// var query = ["SELECT username FROM customer;",
//   "SELECT * FROM product;",
//   "SELECT state FROM orders;",
//   "SELECT amount FROM order_product;",
//   "SELECT * FROM counter;"
// ]

// function checkDB() {
//   for (let i = 0; i < query.length; i++) {
//     connection.query(query[i], function (error, results, fields) {
//       if (error) throw error;
//       console.log(results);
//     });
//   }
// }

app.get('/', (request, response) => {
  response.sendFile("index.html")
});

app.get('/login', (request, response) => {
  console.log(request.query.username)
  response.setHeader("Access-Control-Allow-Origin", "*")

  if (DB.users[request.query.username] !== undefined && DB.users[request.query.username]["password"] === request.query.password) {
    console.log("matches")
    response.status(200).send("Good login")
  } else {
    response.status(401).send("Bad login")
  }
});

app.get('/signup', (request, response) => {
  console.log(request.query.username)
  response.setHeader("Access-Control-Allow-Origin", "*")
  if (DB.users[request.query.username] !== undefined) {
    response.status(401).send("username");
    return;
  }
  unverifiedUsers[request.query.username] = {
    id: Math.floor((Math.random() * 100) + 54),
    active_time: 0,
    password: request.query.password,
  }

  console.log(unverifiedUsers)

  host = request.get('host');
  link = "http://" + request.get('host') + "/verify?id=" + unverifiedUsers[request.query.username].id + "&username=" + request.query.username;

  mailOptions = {
    from: `"Disconnect" <DisconnectSocialApp@gmail.com>`,
    to: request.query.username,
    subject: "Please confirm your Email account",
    html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
  }

  smtpTransport.sendMail(mailOptions, function (error, res) {
    if (error) {
      console.log(error);
      response.status(401).send("error");
    } else {
      response.status(200).send("sent");
    }
  });
});

app.get('/verify', function (request, response) {

  if ((request.protocol + "://" + request.get('host')) == ("http://" + host)) {
    if (unverifiedUsers[request.query.username] !== undefined && request.query.id == unverifiedUsers[request.query.username].id) {

      console.log("Email is verified, confirmed");
      response.end("<h1>Email " + request.query.username + " is been Successfully verified<h1>");

      DB.users[request.query.username] = {
        "password": unverifiedUsers[request.query.username].password
      }
      delete unverifiedUsers[request.query.username]
      fs.writeFile(fileName, JSON.stringify(DB), function (error) {
        if (error) {
          console.log(error);
        }
      });
    } else {
      console.log("Email is not verified");
      response.end("<h1>Bad Request</h1>");
    }
  } else {
    response.end("<h1>Request is from unknown source<h1>");
  }
});

app.listen(8081, () => {
  console.log("READY!!!!!");
});