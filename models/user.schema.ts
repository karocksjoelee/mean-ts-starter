const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  age: Number
});

export interface User {
  username: string;
  password: string;
  email: string;
  age: number;
}

module.exports = mongoose.model('User', User);
