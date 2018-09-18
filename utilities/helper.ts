import { LogType } from './interfaces';
import { Response } from 'express';

const chalk = require('chalk');
const err = chalk.red.bold;
const suc = chalk.green.bold;
const dev = chalk.magenta.bold;
const warn = chalk.yellow.bold;

module.exports.logErr = function(msg: string) {
  console.log(err(objectStringify(msg)));
};

module.exports.logSuc = function(msg: string) {
  console.log(suc(objectStringify(msg)));
};

module.exports.logWarn = function(msg: string) {
  console.log(warn(objectStringify(msg)));
};

module.exports.logDev = function(msg: string) {
  console.log(dev(objectStringify(msg)));
};

module.exports.errLogger = function(error: string, source?: string) {
  if (!source) {
    source = LogType.unknown;
  }
  this.logErr(`--------------------- ${source} -------------------------`);
  console.log(error);
  this.logErr(
    `---------------------------------------------------------------------`
  );
};

module.exports.rejectHandler = function(res: Response, error: any) {
  if (error.status) {
    res.status(error.status).send({
      name: error.name,
      message: error.message
    });
  } else {
    res.status(400).send({
      name: error.name,
      message: error.message
    });
  }
};

module.exports.removeFileExt = function(filename: string) {
  if (typeof filename !== 'string') {
    this.logErr('[ HELPER ][ RemoveFileExt ] Input is not a string');
    return filename;
  }
  return this.upperFL(filename.slice(0, filename.indexOf('.')));
};

module.exports.upperFL = function(filename: string) {
  if (typeof filename !== 'string') {
    this.logErr('[ HELPER ][ UpperFL ] Input is not a string');
    return filename;
  }
  return filename.charAt(0).toUpperCase() + filename.slice(1);
};

module.exports.lowerFL = function(filename: string) {
  if (typeof filename !== 'string') {
    this.logErr('[ HELPER ][ LowerFL ] Input is not a string');
    return filename;
  }
  return filename.charAt(0).toLowerCase() + filename.slice(1);
};

// * Normalize a port into a number, string, or false.
module.exports.normalizePort = function(val: any) {
  const port = parseInt(val, 10);

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

function objectStringify(string: any) {
  if (typeof string === 'object') {
    string = JSON.stringify(string, null, 4);
    return string;
  } else {
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
