const userAccounts = require("../models/userAccounts");
const moment = require("moment");
const multer = require("multer");
const db = require("../util/database");

exports.login = (req, res, next) => {
  res.render("shop/login", {
    path: "/login",
  });
};
exports.getRegister = (req, res, next) => {
  res.render("shop/register", {
    path: "/register",
  });
};
exports.getAuth = async (request, response, next) => {
  const username = request.body.email;
  const password = request.body.password;
  if (username && password) {
    userAccounts
      .login(username, password)
      .then(([results]) => {
        console.log(request);
        if (results.length > 0) {
          // request.session.loggedin = true;
          // request.session.username = username;
          console.log(results[0]);
          response.redirect("/browse");
          response.render("shop/header", {
            user: results[0],
          });
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      })
      .catch(err => console.log(err));
  } else {
    console.log("Enter username and pass");
    response.send("Please enter Username and Password!");
    response.end();
  }
};
exports.getLogin = (req, res, next) => {};
