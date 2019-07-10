const ExpenseModel = require('../../model/Expense/ExpenseModel');

const readAllExpensesGroup = (request, response) => {
  ExpenseModel.find({ group: request.params.id })
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    response.log(error);
  });
};

const readAllExpensesUser = (request, response) => {
  ExpenseModel.find({ $or:[{ from: request.params.userId }, { to: request.params.userId }]})
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    response.log(error);
  });
};

const readExpense = (request, response) => {
  ExpenseModel.findOne({ _id: request.params.expenseId })
  .then(data => {
    response.send(data);
  })
  .catch(error =>{
    response.send(error);
  })
}

module.exports = { 
  readAllExpensesGroup,
  readAllExpensesUser,
  readExpense
} 