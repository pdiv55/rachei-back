const express = require('express');
const router = express.Router();
const createExpense = require('../controller/Expense/create');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', createExpense);

module.exports = router;
