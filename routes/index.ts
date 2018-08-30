import { Router } from 'express';

const express = require('express');
const router: Router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
