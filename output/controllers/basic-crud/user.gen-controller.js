"use strict";
exports.__esModule = true;
var interfaces_1 = require("../../utilities/interfaces");
var helper = require('../../utilities/helper');
var User = require('../../models/user.schema');
module.exports.create = function (userObject) {
    return new Promise(function (resolve, reject) {
        var newData = new User({
            username: userObject.username,
            password: userObject.password,
            email: userObject.email,
            age: userObject.age,
            createDate: userObject.createDate,
            testId: userObject.testId
        });
        newData.save(function (err, newUser) {
            if (err) {
                helper.errLogger(err, interfaces_1.LogType.mongodb);
                return reject(err);
            }
            helper.logSuc("" + interfaces_1.LogType.mongodb + interfaces_1.MongoMethod.save + " New User Created !");
            return resolve(newUser);
        });
    });
};
module.exports.getAll = function () {
    return new Promise(function (resolve, reject) {
        User.find({}, function (err, users) {
            if (err) {
                helper.errLogger(err, interfaces_1.LogType.mongodb);
                return reject(err);
            }
            helper.logSuc("" + interfaces_1.LogType.mongodb + interfaces_1.MongoMethod.find + " Found " + users.length + " Users !");
            return resolve(users);
        });
    });
};
module.exports.getOneById = function (userId) {
    return new Promise(function (resolve, reject) {
        User.findOne({ _id: userId }, function (err, user) {
            if (err) {
                helper.errLogger(err, interfaces_1.LogType.mongodb);
                return reject(err);
            }
            helper.logSuc("" + interfaces_1.LogType.mongodb + interfaces_1.MongoMethod.fineOne + " Found User " + user._id + " !");
            return resolve(user);
        });
    });
};
module.exports.update = function (userId, userObject) {
    return new Promise(function (resolve, reject) {
        User.findOneAndUpdate(userId, userObject, { "new": true }, function (err, updatedUser) {
            if (err) {
                helper.errLogger(err, interfaces_1.LogType.mongodb);
                return reject(err);
            }
            helper.logSuc("" + interfaces_1.LogType.mongodb + interfaces_1.MongoMethod.update + " Updated User - " + updatedUser._id + " !");
            return resolve(updatedUser);
        });
    });
};
module.exports.deleteOneById = function (userId) {
    return new Promise(function (resolve, reject) {
        User.findByIdAndRemove(userId, function (err, deletedUser) {
            if (err) {
                helper.errLogger(err, interfaces_1.LogType.mongodb);
                return reject(err);
            }
            if (deletedUser) {
                helper.logWarn("" + interfaces_1.LogType.mongodb + interfaces_1.MongoMethod["delete"] + " Deleted User - " + deletedUser._id + " !");
                resolve(deletedUser);
            }
            else {
                helper.errLogger('User Not Found!', interfaces_1.LogType.mongodb);
                reject({
                    status: 404,
                    name: 'Not Found',
                    message: 'Could not found User with userId'
                });
            }
        });
    });
};
