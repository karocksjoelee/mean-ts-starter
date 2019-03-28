
import * as mongoose from 'mongoose';

const User = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  age: Number,
  createDate: { type: Date, default: Date.now }
});

export default User;

export interface User {
  username: string;
  password: string;
  email: string;
  age: number;
  createDate: Date;
  _id?: string;
  __v?: number;
}

module.exports = mongoose.model('User', User);
