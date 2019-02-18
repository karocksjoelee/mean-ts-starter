"use strict";
exports.__esModule = true;
var interfaces_1 = require("../interfaces");
var helper = require('../helper');
var fs = require('fs');
var path = require('path');
var codeGenConfig = require('../../../config.json')['code-gen'];
var schemas = {};
var mongoController = require('./mongo.controller');
var strategyMap = {
    'mongo-crud-controller': function (mongoSchemas) {
        return mongoController.generate(mongoSchemas);
    },
    'angular-service': function () {
        return helper.logWarn(interfaces_1.LogType.codeGen + " Angular Service Generator Service is not available yet");
    },
    'postman-json': function () {
        return helper.logWarn(interfaces_1.LogType.codeGen + " Postman JSON Generator Service is not available yet");
    },
    'swagger-json': function () {
        return helper.logWarn(interfaces_1.LogType.codeGen + " Swagger JSON Generator Service is not available yet");
    }
};
fs.readdir(path.join(__dirname, '../../models'), function (err, files) {
    if (err) {
        console.error(err);
        return;
    }
    files.map(function (file) {
        // * schemas contain all models with relative fields.
        schemas[helper.removeFileExt(file)] = require('../../models/' + file).schema.obj;
        Object.keys(codeGenConfig).map(function (serviceName) {
            if (codeGenConfig[serviceName]) {
                strategyMap[serviceName](schemas);
            }
        });
    });
});
helper.logDev(interfaces_1.LogType.codeGen + " Code Generator Running ....");
