const ExpenseModel = require("../../model/Expense/ExpenseModel");
const IndividualExpenseModel = require("../../model/IndividualExpense/IndividualExpenseModel");

const deleteExpense = (request, response) => {
  ExpenseModel.deleteOne({ _id: request.params.id })
  .then(data => {
    IndividualExpenseModel.deleteMany({ expense: request.params.id })
    .then(response => {
      console.log(response);
      console.log('deletado');
    })
    response.status(200).json(data);
  })
  .catch(error => {
    response.send(error);
  });
};

module.exports = deleteExpense;
