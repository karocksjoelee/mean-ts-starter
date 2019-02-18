"use strict";
exports.__esModule = true;
var interfaces_1 = require("../interfaces");
var helper = require('../helper');
var fs = require('fs');
var path = require('path');
var codeGenConfig = require('../../../config.json')['code-gen'];
module.exports.generate = function (allEndPoints) {
    if (codeGenConfig['swagger-json']) {
        helper.logWarn(interfaces_1.LogType.codeGen + " Swagger JSON Generator Service is not available yet");
    }
    else {
        helper.logErr(interfaces_1.LogType.codeGen + " config is set swagger.json generator to false, will not able to generate swagger UI.");
    }
};
module.exports.getAllEndPoints = function (routerStacks) {
    var _this = this;
    var result = [];
    routerStacks.map(function (layer) {
        // * Regular Route Handle
        if (layer.route) {
            if (Object.keys(layer.route.methods).length > 1) {
                _this.logErr(interfaces_1.LogType.codeGen + "[ ShowAllEndPoints ] Line24: Method is more than 1 - " + layer.route.path);
            }
            result.push({
                method: Object.keys(layer.route.methods)[0].toUpperCase(),
                path: layer.route.path
            });
        }
        else if (layer.name === 'router' && layer.handle.stack) {
            var test = '';
            var prePath = test.concat(split(layer.regexp));
            var replacedPath_1 = replaceCommaAs(prePath, '/');
            layer.handle.stack.forEach(function (handler) {
                var secondPath = split(handler.regexp);
                if (Object.keys(handler.route.methods).length > 1) {
                    _this.logErr(interfaces_1.LogType.codeGen + "[ ShowAllEndPoints ] Line39: Method is more than 1 - " + (replacedPath_1 + handler.route.path));
                }
                result.push({
                    method: Object.keys(handler.route.methods)[0].toUpperCase(),
                    path: replacedPath_1 + handler.route.path
                });
            });
        }
    });
    return result;
};
function split(thing) {
    if (typeof thing === 'string') {
        return thing.split('/');
    }
    else if (thing.fast_slash) {
        return '';
    }
    else {
        var match = thing
            .toString()
            .replace('\\/?', '')
            .replace('(?=\\/|$)', '$')
            .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
        return match
            ? match[1].replace(/\\(.)/g, '$1').split('/')
            : '<complex:' + thing.toString() + '>';
    }
}
function replaceCommaAs(target, replacement) {
    if (typeof target === 'string' && typeof replacement === 'string') {
        return target.split(',').join(replacement);
    }
    else {
        this.logErr(interfaces_1.LogType.codeGen + "[ ReplaceCommaAs ] Input is not string");
        return target;
    }
}
