const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const fs = require("fs");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const marketRoutes = require("./routes/market");
const adminRoutes = require("./routes/admin");
const loginRoutes = require("./routes/userAccounts");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "images")));

app.use(marketRoutes);
app.use(adminRoutes);
app.use(loginRoutes);

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.listen(80);
