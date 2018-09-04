import { User } from '../../models/user.schema';
import { Error } from 'mongoose';
import { LogType, MongoMethod } from '../../utilities/interfaces';

const helper = require('../../utilities/helper');
const User = require('../../models/user.schema');


module.exports.create = function(userObject: User) {
  return new Promise((resolve, reject) => {
    const newData = new User ({
      username: userObject.username,
      password: userObject.password,
      email: userObject.email,
      age: userObject.age,
      createDate: userObject.createDate,
      testId: userObject.testId
    });
    newData.save((err: Error, newUser: User) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      helper.logSuc(`[ MONGO-DB ][ SAVE ] New User Created !`);
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
      helper.logSuc(`[ MONGO-DB ][ FIND ] Found ${users.length} Users !`);
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
      helper.logSuc(`[ MONGO-DB ][ FIND-ONE ] Found User ${user._id} !`);
      return resolve(user);
    });
  });
};


module.exports.update = function(userId: string, userObject: User) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(userId, userObject, {new: true}, (err: Error, updatedUser: User) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      helper.logSuc(`[ MONGO-DB ][ FIND-AND-UPDATE ] Updated User - ${updatedUser._id} !`);
      return resolve(updatedUser);
    });
  });
};


module.exports.deleteOneById = function(userId: string) {
  return new Promise((resolve, reject) => {
    User.findByIdAndRemove(userId, (err: Error, deletedUser: User) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      if (deletedUser) {
        helper.logWarn(`[ MONGO-DB ][ FIND-ANE-REMOVE ] Deleted User - ${deletedUser._id} !`);
        resolve(deletedUser);
      } else {
        helper.errLogger('User Not Found!', LogType.mongodb);
        reject({
          status: 404,
          name: 'Not Found',
          message: 'Could not found User with userId'
        });
      }
    });
  });
};

