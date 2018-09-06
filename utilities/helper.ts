import { LogType } from './interfaces';

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

module.exports.removeFileExt = function(filename: string) {
  if (typeof filename !== 'string') {
    this.logErr('[ HELPER ][ RemoveFileExt ] Input is not a string');
    return;
  }
  return this.upperFL(filename.slice(0, filename.indexOf('.')));
};

module.exports.upperFL = function(filename: string) {
  if (typeof filename !== 'string') {
    this.logErr('[ HELPER ][ UpperFL ] Input is not a string');
    return;
  }
  return filename.charAt(0).toUpperCase() + filename.slice(1);
};

module.exports.lowerFL = function(filename: string) {
  if (typeof filename !== 'string') {
    this.logErr('[ HELPER ][ LowerFL ] Input is not a string');
    return;
  }
  return filename.charAt(0).toLowerCase() + filename.slice(1);
};

module.exports.getAllEndPoints = function(routerStacks: any) {
  const result: any = [];
  routerStacks.map((layer: any) => {
    // * Regular Route Handle
    if (layer.route) {
      if (Object.keys(layer.route.methods).length > 1) {
        this.logWarn(`[ HELP][ ShowAllEndPoints ] Line66: Method is more than 1 - ${layer.route.path}`);
      }
      result.push({
        method: Object.keys(layer.route.methods)[0].toUpperCase(),
        path: layer.route.path
      });
    } else if (layer.name === 'router' && layer.handle.stack) {
      const test = '';
      const path = test.concat(split(layer.regexp));
      const replacedPath = replaceCommaAs(path, '/');
      layer.handle.stack.forEach((handler: any) => {
        const secondPath = split(handler.regexp);
        if (Object.keys(handler.route.methods).length > 1) {
          this.logWarn(`[ HELP][ ShowAllEndPoints ] Line80: Method is more than 1 - ${replacedPath + handler.route.path}`);
        }
        result.push({
          method: Object.keys(handler.route.methods)[0].toUpperCase(),
          path: replacedPath + handler.route.path
        });
      });
    }
  });
  return result;
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

function replaceCommaAs(target: string, replacement: string) {
  if (typeof target === 'string' && typeof replacement === 'string') {
    return target.split(',').join(replacement);
  } else {
    this.logErr('[ HELPER ][ ReplaceCommaAs ] Input is not string');
    return target;
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
