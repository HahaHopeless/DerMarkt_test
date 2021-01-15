const db = require("../util/database");
const moment = require("moment");
module.exports = class Product {
  constructor(
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
  ) {
    this.title = title;
    this.description = description;
    this.image = image;
    this.price = price;
    this.posted_on = posted_on;
    this.category = category;
    this.postcode = postcode;
    this.city = city;
    this.street = street;
    this.sellerName = sellerName;
    this.contact = contact;
  }

  save() {
    console.log(`
    ${this.title}
    ${this.description}
    ${this.image}
    ${this.price}
    ${this.posted_on}
    ${this.category}
    ${this.postcode}
    ${this.city}
    ${this.street}
    ${this.sellerName}
    ${this.contact}
    `);

    return db.execute(
      "INSERT INTO products (title, description, imageUrl, price, posted_on, category, postcode, city, street, sellerName, contact) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        this.title,
        this.description,
        this.image,
        this.price,
        this.posted_on,
        this.category,
        this.postcode,
        this.city,
        this.street,
        this.sellerName,
        this.contact,
      ]
      // [
      //   this.title,
      //   this.description,
      //   this.image,
      //   this.price,
      //   this.posted_on,
      //   this.category,
      //   this.postcode,
      //   this.city,
      //   this.street,
      //   this.sellerName,
      //   this.contact,
      // ]
    );
  }

  static findByTitle(title, category, minPrice, maxPrice, city) {
    if (minPrice == "") {
      return db.execute(
        `SELECT * FROM products 
         WHERE approve_status='approved'
         AND title LIKE '%${title}%' 
         AND ('${category}' = '' OR category = '${category}')
         AND ('${city}' = '' OR city = '${city}')
         AND price <= ${maxPrice}
         `
      );
    } else if (maxPrice == "") {
      return db.execute(
        `SELECT * FROM products 
         WHERE approve_status='approved'
         AND title LIKE '%${title}%' 
         AND ('${category}' = '' OR category = '${category}')
         AND ('${city}' = '' OR city = '${city}')
         AND price >= ${minPrice}
         `
      );
    } else if (maxPrice == "" && minPrice == "") {
      return db.execute(
        `SELECT * FROM products 
         WHERE approve_status='approved'
         AND title LIKE '%${title}%' 
         AND ('${category}' = '' OR category = '${category}')
         AND ('${city}' = '' OR city = '${city}')
         `
      );
    } else {
      return db.execute(
        `SELECT * FROM products 
       WHERE approve_status='approved'
       AND title LIKE '%${title}%' 
       AND ('${category}' = '' OR category = '${category}')
       AND ('${city}' = '' OR city = '${city}')
       `
      );
    }
  }
  // ${minPrice}
  // ${maxPrice}

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id=?", [id]);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static fetchAllApproved() {
    return db.execute("SELECT * FROM products WHERE approve_status='approved'");
  }

  static fetchAllPending() {
    return db.execute("SELECT * FROM products WHERE approve_status='pending'");
  }

  static approvePost() {
    return db.execute("SELECT * FROM products WHERE approve_status='pending'");
  }
};

// SELECT * FROM products
//        WHERE approve_status='approved'
//        AND title LIKE '%${title}%'
//        AND (category = '${category}' OR '${category}' IS NOT NULL)
//        AND (city = '${city}' OR '${city}' IS NOT NULL)
//        AND (price BETWEEN (price = ${minPrice} OR ${minPrice} = 0) AND (price = ${maxPrice} OR ${maxPrice} = 0))

// +++++++++++++++++++++++++
// +++++++++++++++++++++++++
// +++++++++++++++++++++++++
// +++++++++++++++++++++++++

// SELECT * FROM products
//        WHERE approve_status='approved'
//        AND title LIKE '%${title}%'
//        AND ('${category}' = '' OR category = '${category}')
//        AND ('${city}' = '' OR city = '${city}')
//        AND price BETWEEN ${minPrice} AND ${maxPrice}
