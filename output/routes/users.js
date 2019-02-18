"use strict";
exports.__esModule = true;
var express = require("express");
var _ = require("lodash");
var userGenController = require('../controllers/basic-crud/user.gen-controller');
var helper = require('../utilities/helper');
var router = express.Router();
router.post('/', function (req, res) {
    userGenController.create(req.body)
        .then(function (result) {
        res.status(201).send(result);
    })["catch"](_.partial(helper.rejectHandler, res));
});
router.get('/(:id)?', function (req, res) {
    if (!req.params.id) {
        userGenController.getAll().then(function (result) {
            res.status(200).send(result);
        })["catch"](_.partial(helper.rejectHandler, res));
    }
    else {
        userGenController.getOneById(req.params.id).then(function (result) {
            res.status(200).send(result);
        })["catch"](_.partial(helper.rejectHandler, res));
    }
});
router.put('/(:id)?', function (req, res) {
    if ('_id' in req.body) {
        delete req.body._id;
    }
    if (!req.params.id) {
        return res.status(400).send({
            name: '_id is missing in url',
            message: 'Update method requires _id for identify the absolute object'
        });
    }
    else {
        userGenController.update(req.params.id, req.body).then(function (result) {
            res.status(200).send(result);
        })["catch"](_.partial(helper.rejectHandler, res));
    }
});
router["delete"]('/(:id)?', function (req, res) {
    if (!req.params.id) {
        return res.status(404).send({
            name: '_id is missing in url',
            message: 'Delete method requires _id for identify the absolute object'
        });
    }
    else {
        userGenController.deleteOneById(req.params.id).then(function (result) {
            res.status(200).send(result);
        })["catch"](_.partial(helper.rejectHandler, res));
    }
});
router.get('/authorized', function (req, res) {
    res.status(200).send('Authorized User');
});
module.exports = router;
