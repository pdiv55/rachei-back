const ExpenseModel = require('../../model/Expense/ExpenseModel');

const createExpense = (request, response) => {
  const expenseDoc = {
    name: request.body.name,
    value: request.body.value,
    currency: request.body.currency,
    from: request.body.from,
    to: request.body.to,
    date: request.body.date,
    picture: request.body.picture,
  };

  ExpenseModel.create(expenseDoc)
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    response.send(error)
  });
};

module.exports = createExpense;