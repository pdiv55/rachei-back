const ExpenseModel = require('../../model/Expense/ExpenseModel');

const updateExpense = (request, response) => {
  ExpenseModel.findOneAndUpdate({ _id: request.params.id }, { update: 'mudanças na despesa' })
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports = { 
  updateExpense,
} 