const ExpenseModel = require('../../model/Expense/ExpenseModel');
const IndividualExpenseModel = require('../../model/IndividualExpense/IndividualExpenseModel');

const updateExpense = (request, response) => {
  const expenseDoc = {
    name: request.body.expense.name,
    date: request.body.expense.date,
    group: request.body.expense.group,
    from: request.body.expense.from,
    to: request.body.expense.to,
    value: request.body.expense.value,
  };

  console.log(expenseDoc.group);

  ExpenseModel.findOneAndUpdate({ _id: request.params.id }, expenseDoc)
  .then(data => {
    console.log(data);
    IndividualExpenseModel.deleteMany({ expense: request.params.id })
    .then(response => {
      console.log(response);
      const individualExpenses = [...request.body.individualExpenses];
      individualExpenses.forEach(element => {
        const IndividualExpenseObj = {
          value: element.value,
          from: element.from,
          to: element.to,
          expense: data._id,
        }
        IndividualExpenseModel.create(IndividualExpenseObj)
        .then(individualExpense => {
          ExpenseModel.update({ _id: data._id }, { $push: { individualExpenses: individualExpense._id }})
          .then(() => {
            console.log(`atualizou a expense: ${data._id}`)
          })
          .catch(error => {
            console.log(error);
          })
        });
      });
    })
    response.status(200).json(data);
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports = { 
  updateExpense,
} 