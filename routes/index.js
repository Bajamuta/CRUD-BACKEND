var express = require('express');
const authController = require("../controllers/api/authController");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
* AUTH
* */
router.post('/auth/login', authController.getToken);

module.exports = router;
