import * as express from 'express';

import { Router, Request, Response, NextFunction } from 'express';

const router: Router = express.Router();

/**
 * @apiDefine AuthHeader
 * @apiHeader {String} access-token OAuth2 access token
 */

 /**
 * @apiDefine Version
 * @apiVersion 0.0.0
 */

  /**
 * @apiDefine UnAuthorizedError
 * @apiError NotAuthorizedOperation The <code>access-token</code> in Header is invalid
 */

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('TEST');
  res.status(200).send('Hello Joe !!');
  // res.render('index');
});

router.get('/api/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Hello Joeerrrddd11rrrrrrr~~~!!');
});



module.exports = router;
