const ExpenseModel = require('../../model/Expense/ExpenseModel');
const IndividualExpenseModel = require('../../model/IndividualExpense/IndividualExpenseModel');
const GroupModel = require('../../model/Group/GroupModel');
const UserModel = require('../../model/User/UserModel');

const createExpense = (request, response) => {
  const expenseDoc = {
    name: request.body.expense.name,
    date: request.body.expense.date,
    group: request.body.expense.group.id,
    users: request.body.expense.users
  };

  ExpenseModel.create(expenseDoc)
  .then(expense => {
    console.log('entrou');
    const group = GroupModel.findById(expense.group).exec();
    const users = UserModel.find({ _id: { $in: request.body.expense.users } }).exec();
    Promise.all([group, users])
    .then(data => {
      console.log('entrou');
      data[0].expenses.push(expense._id);
      data[0].save();

      data[1].forEach(element => {
        element.expenses.push(expense._id);
        element.save();
      })

      const individualExpenses = [...request.body.individualExpenses];
      individualExpenses.forEach(element => {
        console.log(element);
        const IndividualExpenseObj = {
          value: element.value,
          from: element.from,
          to: element.to,
          expense: expense._id,
        }
        console.log(IndividualExpenseObj);
        IndividualExpenseModel.create(IndividualExpenseObj);
      });
      response.status(200).json(expense);
    })
    .catch(error => {
      console.log(error);
    })
  })
  .catch(error => {
    console.log(error)
  });
};

module.exports = createExpense;