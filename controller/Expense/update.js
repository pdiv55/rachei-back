const ExpenseModel = require('../../model/Expense/ExpenseModel');

const updateExpense = (request, response) => {
  const expense = request.body;
  ExpenseModel.findOneAndUpdate({ _id: request.params.id }, expense)
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    response.log(error);
  });
};

module.exports = { 
  updateExpense,
} 