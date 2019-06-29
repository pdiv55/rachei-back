const ExpenseModel = require('../../model/User/ExpenseModel');

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

  console.log(expenseDoc);

  ExpenseModel.create(expenseDoc)
  .then(jawbreaker => {
    response.send(jawbreaker);
  })
  .catch(error => {
    response.send(error)
  });
};

module.exports = createExpense;