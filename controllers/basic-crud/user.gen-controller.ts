import { User } from '../../models/user.schema';
import { Error } from 'mongoose';
import { LogType, MongoMethod } from '../../utilities/interfaces';
import * as helper from '../../utilities/helper';

const User = require('../../models/user.schema');

export function create(userObject: User) {
  return new Promise((resolve, reject) => {
    const newData = new User ({
      username: userObject.username,
      password: userObject.password,
      email: userObject.email,
      age: userObject.age,
      createDate: userObject.createDate
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


export function getAll() {
  return new Promise((resolve, reject) => {
    User.find({}, (err: Error, users: User[]) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      helper.logSuc(`${LogType.mongodb}${MongoMethod.find} Found ${users.length} Users !`);
      return resolve(users);
    });
  });
};


export function getOneById(userId: string) {
  return new Promise((resolve, reject) => {
    User.findOne({_id: userId}, (err: Error, user: User) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      helper.logSuc(`${LogType.mongodb}${MongoMethod.fineOne} Found User ${user._id} !`);
      return resolve(user);
    });
  });
};


export function update(userId: string, userObject: User) {
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(userId, userObject, {new: true}, (err: Error, updatedUser: User) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      helper.logSuc(`${LogType.mongodb}${MongoMethod.update} Updated User - ${updatedUser._id} !`);
      return resolve(updatedUser);
    });
  });
};


export function deleteOneById(userId: string) {
  return new Promise((resolve, reject) => {
    User.findByIdAndRemove(userId, (err: Error, deletedUser: User) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      if (deletedUser) {
        helper.logWarn(`${LogType.mongodb}${MongoMethod.delete} Deleted User - ${deletedUser._id} !`);
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

