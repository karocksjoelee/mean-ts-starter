import { Router } from 'express';

const express = require('express');
const router: Router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('TESTING----!!!!!!');
  res.send('respond with a resource');
});

module.exports = router;
