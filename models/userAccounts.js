const db = require("../util/database");

module.exports = class userAccounts {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  register() {
    console.log(`
    ${this.username} - 
    ${this.email} - 
    ${this.password} - 
    `);

    return db.execute(
      "INSERT INTO products (id, username, email, password) VALUES (?, ?, ?, ?)",
      [this.username, this.email, this.password]
    );
  }

  static login(username, password) {
    return db.execute(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password]
    );
  }
};
