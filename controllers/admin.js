const Product = require("../models/products");
const moment = require("moment");

exports.getBrowse = (req, res, next) => {
  Product.fetchAllPending()
    .then(([rows, fieldData]) => {
      res.render("admin/index", {
        prods: rows,
        path: "/admin",
      });
    })
    .catch(err => console.log(err));
};

exports.getApprove = (req, res, next) => {
  Product.fetchAllPending()
    .then(([rows, fieldData]) => {
      res.render("admin/index", {
        prods: rows,
        path: "/admin",
      });
    })
    .catch(err => console.log(err));
};
