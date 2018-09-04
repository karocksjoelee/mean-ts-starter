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


