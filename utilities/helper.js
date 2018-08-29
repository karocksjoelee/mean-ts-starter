const chalk = require('chalk');
const err = chalk.red.bold;
const suc = chalk.green.bold;
const dev = chalk.magenta.bold;
const warn = chalk.yellow.bold;

module.exports.logErr = function(msg) {
  console.log(err(objectStringify(msg)));
};

module.exports.logSuc = function(msg) {
  console.log(suc(objectStringify(msg)));
};

module.exports.logWarn = function(msg) {
  console.log(warn(objectStringify(msg)));
};

module.exports.logDev = function(msg) {
  console.log(dev(objectStringify(msg)));
};


// * Normalize a port into a number, string, or false.
module.exports.normalizePort = function(val) {
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

function objectStringify(string) {
  if (typeof string === 'object') {
    string = JSON.stringify(string, null, 4);
    return string;
  } else {
    return string;
  }
}

