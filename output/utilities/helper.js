"use strict";
exports.__esModule = true;
var interfaces_1 = require("./interfaces");
var chalk = require('chalk');
var err = chalk.red.bold;
var suc = chalk.green.bold;
var dev = chalk.magenta.bold;
var warn = chalk.yellow.bold;
exports.logErr = function (msg) {
    console.log(err(objectStringify(msg)));
};
exports.logSuc = function (msg) {
    console.log(suc(objectStringify(msg)));
};
exports.logWarn = function (msg) {
    console.log(warn(objectStringify(msg)));
};
exports.logDev = function (msg) {
    console.log(dev(objectStringify(msg)));
};
exports.errLogger = function (error, source) {
    if (!source) {
        source = interfaces_1.LogType.unknown;
    }
    this.logErr("--------------------- " + source + " -------------------------");
    console.log(error);
    this.logErr("---------------------------------------------------------------------");
};
exports.rejectHandler = function (res, error) {
    if (error.status) {
        res.status(error.status).send({
            name: error.name,
            message: error.message
        });
    }
    else {
        res.status(400).send({
            name: error.name,
            message: error.message
        });
    }
};
exports.removeFileExt = function (filename) {
    if (typeof filename !== 'string') {
        this.logErr('[ HELPER ][ RemoveFileExt ] Input is not a string');
        return filename;
    }
    return this.upperFL(filename.slice(0, filename.indexOf('.')));
};
exports.upperFL = function (filename) {
    if (typeof filename !== 'string') {
        this.logErr('[ HELPER ][ UpperFL ] Input is not a string');
        return filename;
    }
    return filename.charAt(0).toUpperCase() + filename.slice(1);
};
exports.lowerFL = function (filename) {
    if (typeof filename !== 'string') {
        this.logErr('[ HELPER ][ LowerFL ] Input is not a string');
        return filename;
    }
    return filename.charAt(0).toLowerCase() + filename.slice(1);
};
// * Normalize a port into a number, string, or false.
exports.normalizePort = function (val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
function objectStringify(string) {
    if (typeof string === 'object') {
        string = JSON.stringify(string, null, 4);
        return string;
    }
    else {
        return string;
    }
}
// * BackUp Code
/*
app._router.stack.forEach(print.bind(null, []));
function print(path: any, layer: any) {
  if (layer.route) {
    layer.route.stack.forEach(
      print.bind(null, path.concat(split(layer.route.path)))
    );
  } else if (layer.name === 'router' && layer.handle.stack) {
    layer.handle.stack.forEach(
      print.bind(null, path.concat(split(layer.regexp)))
    );
  } else if (layer.method) {
    console.log(
      '%s /%s',
      layer.method.toUpperCase(),
      path
        .concat(split(layer.regexp))
        .filter(Boolean)
        .join('/')
    );
  }
}

function split(thing: any) {
  if (typeof thing === 'string') {
    return thing.split('/');
  } else if (thing.fast_slash) {
    return '';
  } else {
    let match = thing
      .toString()
      .replace('\\/?', '')
      .replace('(?=\\/|$)', '$')
      .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);
    return match
      ? match[1].replace(/\\(.)/g, '$1').split('/')
      : '<complex:' + thing.toString() + '>';
  }
}
*/
