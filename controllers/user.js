const Product = require("../models/products");
const moment = require("moment");
const multer = require("multer");

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = "image_URL_goes_here";
  const price = req.body.price;
  const posted_on = moment(new Date()).format("DD/MM/YYYY");
  const category = req.body.category;
  const postcode = req.body.plz;
  const city = req.body.city;
  const street = req.body.streetNr;
  const sellerName = req.body.name;
  const contact = req.body.phone;

  const product = new Product(
    title,
    description,
    image,
    price,
    posted_on,
    category,
    postcode,
    city,
    street,
    sellerName,
    contact
  );
  product
    .save()
    .then(() => {
      res.redirect("/browse");
    })
    .catch(err => console.log(err));
};

// var storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, path.join(`${__dirname}/images`));
//   },
//   filename: (req, file, callback) => {
//     const match = ["image/png", "image/jpeg"];

//     if (match.indexOf(file.mimetype) === -1) {
//       var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
//       return callback(message, null);
//     }

//     var filename = `${Date.now()}-image-${file.originalname}`;
//     callback(null, filename);
//   },
// });

// var uploadFiles = multer({ storage: storage }).array("multi-files", 10);

// exports.imagesUpload = (req, res, next) => {
//   uploadFiles(req, res, function(err) {
//     if (err) {
//       return res.end("Error uploading file.");
//     }
//     res.end("File is uploaded");
//   }); }

exports.getProducts = (req, res, next) => {
  Product.fetchAllApproved(products => {
    res.render("/productList", {
      product: products,
      path: "/products",
    });
  }).catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {
  res.render("shop/index", {
    path: "/",
  });
};

// exports.login = (req, res, next) => {
//   res.render("shop/login", {
//     path: "/login",
//   });
// };
// exports.register = (req, res, next) => {
//   res.render("shop/register", {
//     path: "/register",
//   });
// };
exports.addProduct_page = (req, res, next) => {
  res.render("shop/addProduct", {
    path: "/startSelling",
  });
};
exports.productDetails = (req, res, next) => {
  const id = req.params.id;
  Product.findById(id)
    .then(([product]) => {
      res.render("shop/productDetails", {
        product: product[0],
        path: "/productDetails",
      });
    })
    .catch(err => console.log(err));
};

exports.getBrowse = (req, res, next) => {
  Product.fetchAllApproved("")
    .then(([rows, fieldData]) => {
      res.render("shop/browse", {
        prods: rows,
        path: "/browse",
      });
    })
    .catch(err => console.log(err));
};
exports.getProductsByKeyword = (req, res, next) => {
  const prodTitle = req.query.title;
  const category = req.query.category;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  const city = req.query.city;
  Product.findByTitle(prodTitle, category, minPrice, maxPrice, city)
    .then(([products]) => {
      res.render("shop/browse", {
        prods: products,
        path: "/browse/search",
      });
    })
    .catch(err => console.log(err));
};
