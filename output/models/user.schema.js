"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var User = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    age: Number,
    createDate: { type: Date, "default": Date.now },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' }
});
exports["default"] = User;
module.exports = mongoose.model('User', User);
