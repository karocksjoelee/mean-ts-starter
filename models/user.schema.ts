const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  age: Number,
  createDate: { type: Date, default: Date.now },
  testId : { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
});

export interface User {
  username: string;
  password: string;
  email: string;
  age: number;
  createDate: Date;
  testId: string;
  _id?: string;
  __v?: number;
}

module.exports = mongoose.model('User', User);
