const express = require('express');
const router = express.Router();
const parser = require('../config/files');
const UserModel = require('../model/User/UserModel');
const ExpenseModel = require('../model/Expense/ExpenseModel');

router.post('/upload/user/:id', parser.single("image"), (request, response) => {  
  const userId = request.params.id;
  const url = request.file.url;  
  UserModel.findById(userId)
  .then(user => {
    user.profilePicture = url;
    user.save(err => {
      if (err) {
        response.status(500).json(err);
        return;
      }
      response.status(200).json('Upload feito com sucesso');
    })
  })
  .catch(error => {
    response.status(500).json(error);
  })
});

router.post('/upload/expense/:id', parser.single("image"), (request, response) => {  
  const expenseId = request.params.id;
  const url = request.file.url;  
  ExpenseModel.findById(expenseId)
  .then(expense => {
    expense.bill = url;
    expense.save(err => {
      if (err) {
        response.status(500).json(err);
        return;
      }
      response.status(200).json('Upload feito com sucesso');
    })
  })
  .catch(error => {
    response.status(500).json(error);
  })
});

module.exports = router;