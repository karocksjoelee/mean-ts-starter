import * as express from 'express';

import { Router, Request, Response, NextFunction } from 'express';

const router: Router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index');
});

module.exports = router;
