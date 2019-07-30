const ExpenseModel = require('../../model/Expense/ExpenseModel');
const IndividualExpenseModel = require('../../model/IndividualExpense/IndividualExpenseModel');
const GroupModel = require('../../model/Group/GroupModel');
const UserModel = require('../../model/User/UserModel');

const createExpense = (request, response) => {
  const expenseDoc = {
    name: request.body.expense.name,
    date: request.body.expense.date,
    group: request.body.expense.group,
    from: request.body.expense.from,
    to: request.body.expense.to,
    value: request.body.expense.value,
  };

  ExpenseModel.create(expenseDoc)
  .then(expense => {
    const group = GroupModel.findById(expense.group).exec();
    const users = UserModel.find({ _id: { $in: request.body.expense.users } }).exec();
    Promise.all([group, users])
    .then(data => {
      data[0].expenses.push(expense._id);
      data[0].save();

      data[1].forEach(element => {
        element.expenses.push(expense._id);
        element.save();
      })

      const individualExpenses = [...request.body.individualExpenses];
      individualExpenses.forEach(element => {
        const IndividualExpenseObj = {
          value: element.value,
          from: element.from,
          to: element.to,
          expense: expense._id,
        }
        IndividualExpenseModel.create(IndividualExpenseObj)
        .then(individualExpense => {
          ExpenseModel.update({ _id: expense._id }, { $push: { individualExpenses: individualExpense._id }})
          .then(() => {
            console.log(`atualizou a expense: ${expense._id}`)
          })
          .catch(error => {
            console.log(error);
          })
        });
      });

      response.status(200).json({ expense, message: 'Despesa criada com sucesso!' });
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