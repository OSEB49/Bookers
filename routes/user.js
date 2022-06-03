var express = require('express');
var router = express.Router();
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });

});

