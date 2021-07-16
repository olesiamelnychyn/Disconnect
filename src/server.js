const chalk = require('chalk');
const nodemailer = require("nodemailer");
const express = require("express");
const smtp = require('../jsons/smtp.json');
const dbHandler = require("./utils/dbHandler")

const app = express();
app.use(express.static('public'));
smtpTransport = nodemailer.createTransport(smtp);

var unverifiedUsers = {}, host, link;
var active_users = {}

const printUsers = () => {
  console.log(chalk.bold.green("\nUsers:"));
  for (const [key, value] of Object.entries(active_users)) {
    console.log(chalk.gray("   " + chalk.bold(key) + ": " + value.password))
  }
  console.log(("\n"));
}

dbHandler.getUsers((res) => {
  active_users = res;
  console.log(chalk.bold.green("READY!!!!!"));
  printUsers()
})

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

app.get('/', (request, response) => {
  response.sendFile("index.html")
});

app.get('/login', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")
  if (active_users[request.query.username] !== undefined && active_users[request.query.username]["password"] === request.query.password) {
    console.log('Username ' + chalk.green(request.query.username) + " and password are confirmed!");
    response.status(200).send("Good login")
  } else {
    console.log('Username ' + chalk.red(request.query.username) + " does not exist or the password is incorrect!");
    response.status(401).send("Bad login")
  }
});

app.get('/signup', (request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*")

  if (active_users[request.query.username] !== undefined) {
    console.log('Username ' + chalk.red(request.query.username) + " already exists!");
    response.status(401).send("username");
    return;
  }
  response.status(200).send("sent");

  unverifiedUsers[request.query.username] = {
    id: Math.floor((Math.random() * 100) + 54),
    active_time: 0,
    password: request.query.password,
  }

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
    }
  });
});

app.get('/verify', function (request, response) {

  if ((request.protocol + "://" + request.get('host')) == ("http://" + host)) {
    if (unverifiedUsers[request.query.username] !== undefined && request.query.id == unverifiedUsers[request.query.username].id) {

      console.log("Email " + chalk.green(request.query.username) + " is verified");
      response.end("<h1>Email " + request.query.username + " is successfully verified<h1>");

      dbHandler.insertUser(request.query.username,
        unverifiedUsers[request.query.username].password,
        (users) => {
          active_users = users;
          printUsers();
        });

      delete unverifiedUsers[request.query.username]

    } else {
      console.log("Email " + chalk.red(request.query.username) + " is not verified");
      response.end("<h1>Bad Request</h1>");
    }
  } else {
    response.end("<h1>Request is from unknown source<h1>");
  }
});

app.listen(8081, () => {
  console.log(chalk.blueBright("\n****************************************************************************************************************"))
  console.log("Server is starting...");
});