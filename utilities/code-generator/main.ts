import { LogType, APIEndPoint } from '../interfaces';

const helper = require('../helper');
const fs = require('fs');
const path = require('path');
const codeGenConfig = require('../../../config.json')['code-gen'];
const schemas: any = {};
const mongoController = require('./mongo.controller');
const strategyMap: any = {
  'mongo-crud-controller': (mongoSchemas: any) => {
    return mongoController.generate(mongoSchemas);
  },
  'angular-service': () => {
    return helper.logWarn(`${LogType.codeGen} Angular Service Generator Service is not available yet`);
  },
  'postman-json': () => {
    return helper.logWarn(`${LogType.codeGen} Postman JSON Generator Service is not available yet`);
  },
  'swagger-json': () => {
    return helper.logWarn(`${LogType.codeGen} Swagger JSON Generator Service is not available yet`);
  }
};


fs.readdir(path.join(__dirname, '../../models'), (err: any, files: Array<string>) => {
  if (err) {
    console.error(err);
    return;
  }
  files.map((file: string) => {
    // * schemas contain all models with relative fields.
    schemas[helper.removeFileExt(file)] = require('../../models/' + file).schema.obj;
    Object.keys(codeGenConfig).map((serviceName: string) => {
      if (codeGenConfig[serviceName]) {
        strategyMap[serviceName](schemas);
      }
    });
   });
});


helper.logDev(`${LogType.codeGen} Code Generator Running ....`);
