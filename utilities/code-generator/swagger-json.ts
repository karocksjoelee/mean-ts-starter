import { LogType, APIEndPoint } from '../interfaces';

const helper = require('../helper');
const fs = require('fs');
const path = require('path');
const codeGenConfig = require('../../../config.json')['code-gen'];

module.exports.generate = function(allEndPoints: APIEndPoint[]) {
  if (codeGenConfig['swagger-json']) {
    helper.logWarn(`${LogType.codeGen} Swagger JSON Generator Service is not available yet`);
  } else {
    helper.logErr(`${LogType.codeGen} config is set swagger.json generator to false, will not able to generate swagger UI.`);
  }
};


module.exports.getAllEndPoints = function(routerStacks: any) {
  const result: any = [];
  routerStacks.map((layer: any) => {
    // * Regular Route Handle
    if (layer.route) {
      if (Object.keys(layer.route.methods).length > 1) {
        this.logErr(`${LogType.codeGen}[ ShowAllEndPoints ] Line24: Method is more than 1 - ${layer.route.path}`);
      }
      result.push({
        method: Object.keys(layer.route.methods)[0].toUpperCase(),
        path: layer.route.path
      });
    } else if (layer.name === 'router' && layer.handle.stack) {
      const test = '';
      const prePath = test.concat(split(layer.regexp));
      const replacedPath = replaceCommaAs(prePath, '/');
      layer.handle.stack.forEach((handler: any) => {
        const secondPath = split(handler.regexp);
        if (Object.keys(handler.route.methods).length > 1) {
          this.logErr(`${LogType.codeGen}[ ShowAllEndPoints ] Line39: Method is more than 1 - ${replacedPath + handler.route.path}`);
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
    this.logErr(`${LogType.codeGen}[ ReplaceCommaAs ] Input is not string`);
    return target;
  }
}
