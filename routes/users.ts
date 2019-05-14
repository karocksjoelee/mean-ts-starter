import * as express from 'express';
import * as _ from 'lodash';

import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/user.schema';

import * as userGenController from '../controllers/basic-crud/user.gen-controller';
import * as helper from '../utilities/helper';

const router: Router = express.Router();


/**
 * @api {post} /api/users Create New User
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiUse Version
 * @apiUse AuthHeader
 * @apiUse UnAuthorizedError
 *
 * @apiParam {String} username username
 * @apiParam {String} password password
 * @apiParam {String} email user's email
 * @apiParam {Number} age user's age
 * @apiParam {Date} [createDate] Default is current ISO date
 *
 * @apiSuccess {String} _id Unique ID of the User.
 * @apiSuccess {Number} _v MongoDB version usage.
 * @apiSuccess {String} username  username of the User.
 * @apiSuccess {String} password password of the User.
 * @apiSuccess {String} email email of the User.
 * @apiSuccess {Number} age age of the User.
 * @apiSuccess {createDate} createDate of the User.
 *
 * @apiSuccessExample {json} Success-Response
 *  {
      "_id": "5c9c833846cbd803c81f5c14",
      "username": "tester02",
      "password": "123456",
      "email": "tester02@gmail.com",
      "age": 27,
      "createDate": "2019-03-28T08:18:00.232Z",
      "__v": 0
    }
 */
router.post('/', (req: Request, res: Response) => {
  userGenController.create(req.body)
  .then((result: User) => {
    res.status(201).send(result);
  }).catch(_.partial(helper.rejectHandler, res));
});


/**
 *
 * @api {get} /users/(:id?) GetUsers
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiUse Version
 * @apiUse AuthHeader
 *
 * @apiParam  {String} [id] id user's uniquie id (_id)
 *
 * @apiSuccess {String} _id Unique ID of the User.
 * @apiSuccess {Number} _v MongoDB version usage.
 * @apiSuccess {String} username  username of the User.
 * @apiSuccess {String} password password of the User.
 * @apiSuccess {String} email email of the User.
 * @apiSuccess {Number} age age of the User.
 * @apiSuccess {createDate} createDate of the User.
 *
 * @apiParamExample  {type} Request-Example(By ID):
 * {
 *     id: '5c9c7da459b3299fc2712f93'
 * }
 *
 *
 * @apiSuccessExample {json} Success-Response(All Users):
 * [
    {
        "_id": "5c9c7da459b3299fc2712f93",
        "username": "tester01",
        "password": "123456",
        "email": "tester01@gmail.com",
        "age": 27,
        "createDate": "2019-03-28T07:54:12.971Z",
        "__v": 0
    },
    {
        "_id": "5c9c833846cbd803c81f5c14",
        "username": "tester02",
        "password": "123456",
        "email": "tester02@gmail.com",
        "age": 27,
        "createDate": "2019-03-28T08:18:00.232Z",
        "__v": 0
    }
]
 * @apiSuccessExample {json} Success-Response(User By ID)
 * {
        "_id": "5c9c7da459b3299fc2712f93",
        "username": "tester01",
        "password": "123456",
        "email": "tester01@gmail.com",
        "age": 27,
        "createDate": "2019-03-28T07:54:12.971Z",
        "__v": 0
    }
 *
 */
router.get('/(:id)?', (req: Request, res: Response) => {
  if (!req.params.id) {
    userGenController.getAll().then((result: User[]) => {
      res.status(200).send(result);
    }).catch(_.partial(helper.rejectHandler, res));
  } else {
    userGenController.getOneById(req.params.id).then((result: User) => {
      res.status(200).send(result);
    }).catch(_.partial(helper.rejectHandler, res));
  }
});

/**
 * @api {put} /api/users/:id Update Exist User
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiUse Version
 * @apiUse AuthHeader
 * @apiUse UnAuthorizedError
 *
 * @apiParam {String} id user's _id
 * @apiParam {String} username username
 * @apiParam {String} password password
 * @apiParam {String} email user's email
 * @apiParam {Number} age user's age
 *
 * @apiSuccess {String} _id Unique ID of the User.
 * @apiSuccess {Number} _v MongoDB version usage.
 * @apiSuccess {String} username  username of the User.
 * @apiSuccess {String} password password of the User.
 * @apiSuccess {String} email email of the User.
 * @apiSuccess {Number} age age of the User.
 * @apiSuccess {createDate} createDate of the User.
 *
 * @apiSuccessExample {json} Success-Response
 *  {
    "_id": "5c9c7da459b3299fc2712f93",
    "username": "tester02-updated",
    "password": "123456-update",
    "email": "tester02-updated@gmail.com",
    "age": 30,
    "createDate": "2019-03-28T07:54:12.971Z",
    "__v": 0
}
 */
router.put('/(:id)?', (req: Request, res: Response) => {
  if ( '_id' in req.body) {
    delete req.body._id;
  }
  if (!req.params.id) {
    return res.status(400).send({
      name: '_id is missing in url',
      message: 'Update method requires _id for identify the absolute object'
    });
  } else {
    userGenController.update(req.params.id, req.body).then((result: User) => {
      res.status(200).send(result);
    }).catch(_.partial(helper.rejectHandler, res));
  }
});

/**
 *
 * @api {delete} /user/:id Delete Existed User By ID
 * @apiName DeleteUser
 * @apiGroup User
 *
 * @apiUse Version
 * @apiUse AuthHeader
 * @apiUse UnAuthorizedError
 *
 *
 * @apiParam  {String} id User's _id, you want to delete
 *
 * @apiSuccess (200) {json} deleted Return Deleted User JSON
 *
 *
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    "_id": "5c9c7da459b3299fc2712f93",
    "username": "tester02-updated",
    "password": "123456-update",
    "email": "tester02-updated@gmail.com",
    "age": 30,
    "createDate": "2019-03-28T07:54:12.971Z",
    "__v": 0
}
 *
 * @apiErrorExample {json} 404:
 * {
    "name": "Not Found",
    "message": "Could not found User with userId"
}
 *
 *
 */
router.delete('/(:id)?', (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(404).send({
      name: '_id is missing in url',
      message: 'Delete method requires _id for identify the absolute object'
    });
  } else {
    userGenController.deleteOneById(req.params.id).then((result: User) => {
      res.status(200).send(result);
    }).catch(_.partial(helper.rejectHandler, res));
  }
});

router.get('/authorized', (req: Request, res: Response) => {
  res.status(200).send('Authorized User');
});

module.exports = router;
