const express = require('express');
const router = express.Router();
const createUser = require('../controller/User/create');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', createUser);

module.exports = router;
