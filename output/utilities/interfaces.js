"use strict";
exports.__esModule = true;
var LogType;
(function (LogType) {
    LogType["unknown"] = "[ Unknown Source ]";
    LogType["gulp"] = "[ GULP ]";
    LogType["server"] = "[ SERVER ]";
    LogType["mongodb"] = "[ MONGO-DB ]";
    LogType["route"] = "[ ROUTE ]";
    LogType["codeGen"] = "[ CODE-GEN ]";
})(LogType = exports.LogType || (exports.LogType = {}));
var MongoMethod;
(function (MongoMethod) {
    MongoMethod["save"] = "[ SAVE ]";
    MongoMethod["find"] = "[ FIND ]";
    MongoMethod["fineOne"] = "[ FIND-ONE ]";
    MongoMethod["update"] = "[ FIND-AND-UPDATE ]";
    MongoMethod["delete"] = "[ FIND-ANE-REMOVE ]";
})(MongoMethod = exports.MongoMethod || (exports.MongoMethod = {}));
