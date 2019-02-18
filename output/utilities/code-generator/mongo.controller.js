"use strict";
exports.__esModule = true;
var interfaces_1 = require("../interfaces");
var helper = require('../helper');
var fs = require('fs');
var path = require('path');
module.exports.generate = function (schemas) {
    helper.logDev(interfaces_1.LogType.codeGen + " Generate Mongo Controller ...");
    for (var schemaName in schemas) {
        if (schemas.hasOwnProperty(schemaName)) {
            var schemaNameLowerFL = helper.lowerFL(schemaName);
            var createFsController = fs.createWriteStream(path.join(__dirname, "../../../controllers/basic-crud/" + schemaNameLowerFL + ".gen-controller.ts"));
            createFsController.write(writeControllerFile("" + schemaNameLowerFL, schemas[schemaName]));
            createFsController.end();
            helper.logDev(interfaces_1.LogType.codeGen + " " + schemaNameLowerFL + ".gen-controller.ts generated !");
        }
    }
};
function writeControllerFile(schemaName, schemaObject) {
    var schemaNameUpperFL = helper.upperFL(schemaName);
    var schemaNameLowerFL = schemaName;
    return "import { " + schemaNameUpperFL + " } from '../../models/" + schemaNameLowerFL + ".schema';\nimport { Error } from 'mongoose';\nimport { LogType, MongoMethod } from '../../utilities/interfaces';\n\nconst helper = require('../../utilities/helper');\nconst User = require('../../models/user.schema');\n\n" + createController(schemaName, schemaObject) + "\n" + getAllController(schemaName) + "\n" + getOneController(schemaName) + "\n" + updateController(schemaName) + "\n" + deleteController(schemaName) + "\n";
}
// * CRUD Controller Templates : (Private Functions)
function createController(schemaName, schemaObject) {
    var schemaNameUpperFL = helper.upperFL(schemaName);
    var schemaNameLowerFL = schemaName;
    return "\nmodule.exports.create = function(" + schemaNameLowerFL + "Object: " + schemaNameUpperFL + ") {\n  return new Promise((resolve, reject) => {\n    const newData = new " + schemaNameUpperFL + " ({\n" + schemaAssign(schemaNameLowerFL + "Object", schemaObject) + "\n    });\n    newData.save((err: Error, newUser: User) => {\n      if (err) {\n        helper.errLogger(err, LogType.mongodb);\n        return reject(err);\n      }\n      helper.logSuc(`${LogType.mongodb}${MongoMethod.save} New " + schemaNameUpperFL + " Created !`);\n      return resolve(new" + schemaNameUpperFL + ");\n    });\n  });\n};\n";
}
function getAllController(schemaName) {
    var schemaNameUpperFL = helper.upperFL(schemaName);
    var schemaNameLowerFL = schemaName;
    return "\nmodule.exports.getAll = function() {\n  return new Promise((resolve, reject) => {\n    " + schemaNameUpperFL + ".find({}, (err: Error, " + schemaNameLowerFL + "s: " + schemaNameUpperFL + "[]) => {\n      if (err) {\n        helper.errLogger(err, LogType.mongodb);\n        return reject(err);\n      }\n      helper.logSuc(`${LogType.mongodb}${MongoMethod.find} Found ${" + schemaNameLowerFL + "s.length} Users !`);\n      return resolve(" + schemaNameLowerFL + "s);\n    });\n  });\n};\n";
}
function getOneController(schemaName) {
    var schemaNameUpperFL = helper.upperFL(schemaName);
    var schemaNameLowerFL = schemaName;
    return "\nmodule.exports.getOneById = function(" + schemaNameLowerFL + "Id: string) {\n  return new Promise((resolve, reject) => {\n    " + schemaNameUpperFL + ".findOne({_id: " + schemaNameLowerFL + "Id}, (err: Error, " + schemaNameLowerFL + ": " + schemaNameUpperFL + ") => {\n      if (err) {\n        helper.errLogger(err, LogType.mongodb);\n        return reject(err);\n      }\n      helper.logSuc(`${LogType.mongodb}${MongoMethod.fineOne} Found User ${" + schemaNameLowerFL + "._id} !`);\n      return resolve(" + schemaNameLowerFL + ");\n    });\n  });\n};\n";
}
function updateController(schemaName) {
    var schemaNameUpperFL = helper.upperFL(schemaName);
    var schemaNameLowerFL = schemaName;
    return "\nmodule.exports.update = function(" + schemaNameLowerFL + "Id: string, " + schemaNameLowerFL + "Object: " + schemaNameUpperFL + ") {\n  return new Promise((resolve, reject) => {\n    " + schemaNameUpperFL + ".findOneAndUpdate(" + schemaNameLowerFL + "Id, " + schemaNameLowerFL + "Object, {new: true}, (err: Error, updated" + schemaNameUpperFL + ": " + schemaNameUpperFL + ") => {\n      if (err) {\n        helper.errLogger(err, LogType.mongodb);\n        return reject(err);\n      }\n      helper.logSuc(`${LogType.mongodb}${MongoMethod.update} Updated User - ${updated" + schemaNameUpperFL + "._id} !`);\n      return resolve(updated" + schemaNameUpperFL + ");\n    });\n  });\n};\n";
}
function deleteController(schemaName) {
    var schemaNameUpperFL = helper.upperFL(schemaName);
    var schemaNameLowerFL = schemaName;
    return "\nmodule.exports.deleteOneById = function(" + schemaNameLowerFL + "Id: string) {\n  return new Promise((resolve, reject) => {\n    " + schemaNameUpperFL + ".findByIdAndRemove(" + schemaNameLowerFL + "Id, (err: Error, deleted" + schemaNameUpperFL + ": " + schemaNameUpperFL + ") => {\n      if (err) {\n        helper.errLogger(err, LogType.mongodb);\n        return reject(err);\n      }\n      if (deleted" + schemaNameUpperFL + ") {\n        helper.logWarn(`${LogType.mongodb}${MongoMethod.delete} Deleted User - ${deleted" + schemaNameUpperFL + "._id} !`);\n        resolve(deleted" + schemaNameUpperFL + ");\n      } else {\n        helper.errLogger('" + schemaNameUpperFL + " Not Found!', LogType.mongodb);\n        reject({\n          status: 404,\n          name: 'Not Found',\n          message: 'Could not found " + schemaNameUpperFL + " with " + schemaNameLowerFL + "Id'\n        });\n      }\n    });\n  });\n};\n";
}
function schemaAssign(source, schemaObject) {
    var assignTemplate = '';
    for (var key in schemaObject) {
        if (schemaObject.hasOwnProperty(key)) {
            assignTemplate += '      ' + key + ': ' + source + '.' + key + ',\n';
        }
    }
    return assignTemplate.slice(0, -2);
}
