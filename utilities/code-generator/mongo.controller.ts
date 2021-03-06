// * Module Dependencies
import * as helper from '../helper';
import * as fs from 'fs';
import * as path from 'path';

// * Interfaces
import { LogType } from '../interfaces';

export function generate(schemas: any) {
  helper.logDev(`${LogType.codeGen} Generate Mongo Controller ...`);
  for (let schemaName in schemas) {
    if (schemas.hasOwnProperty(schemaName)) {
      const schemaNameLowerFL = helper.lowerFL(schemaName);
      const createFsController = fs.createWriteStream(
        path.join(__dirname, `../../../controllers/basic-crud/${schemaNameLowerFL}.gen-controller.ts`)
      );
      createFsController.write(writeControllerFile(`${schemaNameLowerFL}`, schemas[schemaName]));
      createFsController.end();
      helper.logDev(`${LogType.codeGen} ${schemaNameLowerFL}.gen-controller.ts generated !`);
    }
  }
};


function writeControllerFile(schemaName: string, schemaObject: any) {
  const schemaNameUpperFL = helper.upperFL(schemaName);
  const schemaNameLowerFL = schemaName;
  return `import { ${schemaNameUpperFL} } from '../../models/${schemaNameLowerFL}.schema';
import { Error } from 'mongoose';
import { LogType, MongoMethod } from '../../utilities/interfaces';
import * as help from '../../utilities/helper';

const helper = require('../../utilities/helper');
const User = require('../../models/user.schema');

${createController(schemaName, schemaObject)}
${getAllController(schemaName)}
${getOneController(schemaName)}
${updateController(schemaName)}
${deleteController(schemaName)}
`;
}


// * CRUD Controller Templates : (Private Functions)
function createController(schemaName: string, schemaObject: any) {
  const schemaNameUpperFL = helper.upperFL(schemaName);
  const schemaNameLowerFL = schemaName;
  return `
export function create(${schemaNameLowerFL}Object: ${schemaNameUpperFL}) {
  return new Promise((resolve, reject) => {
    const newData = new ${schemaNameUpperFL} ({
${schemaAssign(`${schemaNameLowerFL}Object`, schemaObject)}
    });
    newData.save((err: Error, newUser: User) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      helper.logSuc(\`$\{LogType.mongodb}$\{MongoMethod.save} New ${schemaNameUpperFL} Created !\`);
      return resolve(new${schemaNameUpperFL});
    });
  });
};
`;
}

function getAllController(schemaName: string) {
  const schemaNameUpperFL = helper.upperFL(schemaName);
  const schemaNameLowerFL = schemaName;
  return `
export function getAll() {
  return new Promise((resolve, reject) => {
    ${schemaNameUpperFL}.find({}, (err: Error, ${schemaNameLowerFL}s: ${schemaNameUpperFL}[]) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      helper.logSuc(\`$\{LogType.mongodb}$\{MongoMethod.find} Found $\{${schemaNameLowerFL}s.length\} Users !\`);
      return resolve(${schemaNameLowerFL}s);
    });
  });
};
`;
}

function getOneController(schemaName: string) {
  const schemaNameUpperFL = helper.upperFL(schemaName);
  const schemaNameLowerFL = schemaName;
  return `
export function getOneById(${schemaNameLowerFL}Id: string) {
  return new Promise((resolve, reject) => {
    ${schemaNameUpperFL}.findOne({_id: ${schemaNameLowerFL}Id}, (err: Error, ${schemaNameLowerFL}: ${schemaNameUpperFL}) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      helper.logSuc(\`$\{LogType.mongodb}$\{MongoMethod.fineOne} Found User $\{${schemaNameLowerFL}._id\} !\`);
      return resolve(${schemaNameLowerFL});
    });
  });
};
`;
}

function updateController(schemaName: string) {
  const schemaNameUpperFL = helper.upperFL(schemaName);
  const schemaNameLowerFL = schemaName;
  return `
export function update(${schemaNameLowerFL}Id: string, ${schemaNameLowerFL}Object: ${schemaNameUpperFL}) {
  return new Promise((resolve, reject) => {
    ${schemaNameUpperFL}.findOneAndUpdate(${schemaNameLowerFL}Id, ${schemaNameLowerFL}Object, {new: true}, (err: Error, updated${schemaNameUpperFL}: ${schemaNameUpperFL}) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      helper.logSuc(\`$\{LogType.mongodb}$\{MongoMethod.update} Updated User - $\{updated${schemaNameUpperFL}._id\} !\`);
      return resolve(updated${schemaNameUpperFL});
    });
  });
};
`;
}

function deleteController(schemaName: string) {
  const schemaNameUpperFL = helper.upperFL(schemaName);
  const schemaNameLowerFL = schemaName;
  return `
export function deleteOneById(${schemaNameLowerFL}Id: string) {
  return new Promise((resolve, reject) => {
    ${schemaNameUpperFL}.findByIdAndRemove(${schemaNameLowerFL}Id, (err: Error, deleted${schemaNameUpperFL}: ${schemaNameUpperFL}) => {
      if (err) {
        helper.errLogger(err, LogType.mongodb);
        return reject(err);
      }
      if (deleted${schemaNameUpperFL}) {
        helper.logWarn(\`$\{LogType.mongodb}$\{MongoMethod.delete} Deleted User - $\{deleted${schemaNameUpperFL}._id\} !\`);
        resolve(deleted${schemaNameUpperFL});
      } else {
        helper.errLogger('${schemaNameUpperFL} Not Found!', LogType.mongodb);
        reject({
          status: 404,
          name: 'Not Found',
          message: 'Could not found ${schemaNameUpperFL} with ${schemaNameLowerFL}Id'
        });
      }
    });
  });
};
`;
}


function schemaAssign(source: any, schemaObject: any) {
  let assignTemplate = '';

  for (let key in schemaObject) {
    if (schemaObject.hasOwnProperty(key)) {
      assignTemplate += '      ' + key + ': ' + source + '.' + key + ',\n';
    }
  }
  return assignTemplate.slice(0, -2);
}

