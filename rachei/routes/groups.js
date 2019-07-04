const express = require('express');
const router = express.Router();
const createGroup = require('../controller/Group/create');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', createGroup);

module.exports = router;
