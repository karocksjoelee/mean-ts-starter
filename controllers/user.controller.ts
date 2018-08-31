import { User } from '../models/user.schema';
import { Error } from 'mongoose';
import { LogType, MongoMethod } from '../utilities/interfaces';

const helper = require('../utilities/helper');
const User = require('../models/user.schema');

module.exports.create = function(userObject: User) {
  return new Promise((resolve, reject) => {
    const newData = new User ({
      username: userObject.username,
      password: userObject.password,
      email: userObject.email,
      age: userObject.age
    });
    newData.save((err: Error, newUser: User) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      helper.logSuc(`${LogType.mongodb}${MongoMethod.save} New User Created !`);
      return resolve(newUser);
    });
  });
};

module.exports.getAll = function() {
  return new Promise((resolve, reject) => {
    User.find({}, (err: Error, users: User[]) => {
        if (err) {
          helper.errLogger(err, LogType.mongodb);
          return reject(err);
        }
        helper.logSuc(`${LogType.mongodb}${MongoMethod.find} Found ${users.length} Users`);
        return resolve(users);
    });
  });
};

module.exports.getOneById = function(userId: string) {
  return new Promise((resolve, reject) => {
    User.findOne({_id: userId}, (err: Error, user: User) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      helper.logSuc(`${LogType.mongodb}${MongoMethod.fineOne} Found User - ${user._id}`);
      return resolve(user);
    });
  });
};

module.exports.update = function(userObject: User) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(userObject._id, userObject, {new: true}, (err: Error, updatedUser: User) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      helper.logSuc(`${LogType.mongodb}${MongoMethod.update} Updated User - ${updatedUser._id}`);
      return resolve(updatedUser);
    });
  });
};

module.exports.delete = function(userId: string) {
  return new Promise((resolve, reject) => {
    User.findByIdAndRemove(userId, (err: Error, deletedUser: User) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      helper.logWarn(`${LogType.mongodb}${MongoMethod.delete} Deleted User - ${deletedUser._id}`);
      return resolve(deletedUser);
    });
  });
};

