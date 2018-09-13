import * as express from 'express';
import * as _ from 'lodash';

import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/user.schema';
import { Error } from 'mongoose';
import { ErrorResponse } from '../utilities/interfaces';

const userGenController = require('../controllers/basic-crud/user.gen-controller');
const helper = require('../utilities/helper');
const router: Router = express.Router();

router.post('/', (req: Request, res: Response) => {
  userGenController.create(req.body)
  .then(() => {
    throw new Error('test error');
  })
  .then((result: User) => {
    res.status(201).send(result);
  }).catch(_.partial(helper.rejectHandler, res));
});

router.get('/(:id)?', (req: Request, res: Response) => {
  if (!req.params.id) {
    userGenController.getAll().then((result: User[]) => {
      res.status(200).send(result);
    }).catch(helper.rejectHandler, res);
  } else {
    userGenController.getOneById(req.params.id).then((result: User) => {
      res.status(200).send(result);
    }).catch(_.partial(helper.rejectHandler, res));
  }
});

router.put('/:id', (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).send({
      name: '_id is missing',
      message: 'Update method requires _id for identify the absolute object'
    });
  } else {
    userGenController.update(req.params.id, req.body).then((result: User) => {
      res.status(200).send(result);
    }).catch(_.partial(helper.rejectHandler, res));
  }
});

router.delete('/:id', (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(404).send({
      name: '_id is missing',
      message: 'Delete method requires _id for identify the absolute object'
    });
  } else {
    userGenController.deleteOneById(req.params.id).then((result: User) => {
      res.status(200).send(result);
    }).catch(_.partial(helper.rejectHandler, res));
  }
});

module.exports = router;
