import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/user.schema';
import { Error } from 'mongoose';

const express = require('express');
const userController = require('../controllers/user.controller');
const helper = require('../utilities/helper');
const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  userController.create(req.body).then((result: User) => {
    res.status(201).send(result);
  }).catch((err: Error) => {
    res.status(400).send({
      name: err.name,
      message: err.message
    });
  });
});

router.get('/(:id)?', (req: Request, res: Response) => {
  if (!req.params.id) {
    userController.getAll().then((result: User[]) => {
      res.status(200).send(result);
    }).catch((err: Error) => {
      res.status(400).send({
        name: err.name,
        message: err.message
      });
    });
  } else {
    userController.getOneById(req.params.id).then((result: User) => {
      res.status(200).send(result);
    }).catch((err: Error) => {
      res.status(400).send({
        name: err.name,
        message: err.message
      });
    });
  }
});

router.put('/', (req: Request, res: Response) => {
  if (!req.body._id) {
    return res.status(400).send({
      name: '_id is missing',
      message: 'Update method requires _id for identify the absolute object'
    });
  } else {
    userController.update(req.body).then((result: User) => {
      res.status(200).send(result);
    }).catch((err: Error) => {
      res.status(400).send({
        name: err.name,
        message: err.message
      });
    });
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(404).send({
      name: '_id is missing',
      message: 'Delete method requires _id for identify the absolute object'
    });
  } else {
    userController.delete(req.params.id).then((result: User) => {
      res.status(200).send(result);
    }).catch((err: Error) => {
      res.status(400).send({
        name: err.name,
        message: err.message
      });
    });
  }
});

module.exports = router;
