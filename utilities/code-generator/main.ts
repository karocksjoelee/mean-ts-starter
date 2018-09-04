import { LogType } from '../interfaces';

const helper = require('../helper');
const fs = require('fs');
const path = require('path');
const config = require('../../../config.json')['code-gen'];
const schemas: any = {};
const mongoController = require('./mongo.controller');


fs.readdir(path.join(__dirname, '../../models'), (err: any, files: Array<string>) => {
  if (err) {
    console.error(err);
    return;
  }
  files.map((file: string) => {
    // * schemas contain all models with relative fields.
    schemas[helper.removeFileExt(file)] = require('../../models/' + file).schema.obj;
    if (config['mongo-crud-controller']) {
      helper.logDev(`${LogType.codeGen} Generate Mongo Controller ...`);
      mongoController.generate(schemas);
    }
    if (config['angular-service']) {
      helper.logWarn(`${LogType.codeGen} Angular Service Generator is not available yet.`);
    }
    if (config['postman-json']) {
      helper.logWarn(`${LogType.codeGen} Postman Test JSON Generator is not available yet.`);
    }
   });
});

helper.logDev(`${LogType.codeGen} Code Generator Running ....`);
