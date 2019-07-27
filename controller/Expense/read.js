const ExpenseModel = require('../../model/Expense/ExpenseModel');
const IndividualExpenseModel = require('../../model/IndividualExpense/IndividualExpenseModel');

const readAllExpensesGroup = (request, response) => {
  ExpenseModel.find({ group: request.params.id })
  .populate({
  path: 'individualExpenses',
  populate: [{
    path: 'from'
  },
  {
    path: 'to'
  }]
  })
  .populate('from')
  .populate('to')
  .then(data => {
    console.log(data);
    response.status(200).json(data);
  })
  .catch(error => {
    console.log(error);
  });
};

const readAllExpensesUser = (request, response) => {
  const from = IndividualExpenseModel.find({ from: request.decoded.userId }).populate('expense').exec();
  const to = IndividualExpenseModel.find({ to: request.decoded.userId }).populate('expense').exec();
  Promise.all([from, to])
  .then(data => {
    response.status(200).json(data);
  })
  .catch(error => {
    console.log(error);
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