const db = require('../config/db');

const createUser = (email, password, callback) => {
  const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.execute(query, [email, password], callback);
};

const findUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  db.execute(query, [email], callback);
};

module.exports = {
  createUser,
  findUserByEmail
};
