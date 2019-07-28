const ExpenseModel = require("../../model/Expense/ExpenseModel");

const deleteExpense = (request, response) => {
  ExpenseModel.deleteOne({ _id: request.params.id })
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.send(error);
    });
};

module.exports = deleteExpense;
