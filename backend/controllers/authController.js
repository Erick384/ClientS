const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/userModel');
const generateToken = require('../config/jwtConfig');

const signup = (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  createUser(email, hashedPassword, (err) => {
    if (err) return res.status(500).send('Server error');
    const token = generateToken({ email });
    res.status(201).json({ token });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  findUserByEmail(email, (err, results) => {
    if (err || results.length === 0) return res.status(404).send('User not found');
    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send('Invalid password');
    const token = generateToken(user);
    res.status(200).json({ token });
  });
};

const getMembers = (req, res) => {
  const query = 'SELECT email FROM users';
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Server error');
    res.status(200).json(results);
  });
};

module.exports = {
  signup,
  login,
  getMembers
};
