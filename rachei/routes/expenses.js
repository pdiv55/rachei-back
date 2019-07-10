const express = require('express');
const router = express.Router();
const createExpense = require('../controller/Expense/create');
const { updateExpense } = require('../controller/Expense/update');
const { readAllExpensesGroup, readAllExpensesUser, readExpense } = require('../controller/Expense/read');
const deleteExpense = require('../controller/Expense/delete');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/group/:id', readAllExpensesGroup);

router.get('/user/:id', readAllExpensesUser);

router.get('/:id', readExpense);

router.post('/create', createExpense);

router.post('/update/:id', updateExpense);

router.delete('/delete/:id', deleteExpense);

module.exports = router;
