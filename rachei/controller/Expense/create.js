const ExpenseModel = require('../../model/Expense/ExpenseModel');
const GroupModel = require('../../model/Group/GroupModel');
const UserModel = require('../../model/User/UserModel');

const createExpense = (request, response) => {
  const expenseDoc = {
    name: request.body.name,
    value: request.body.value,
    currency: request.body.currency,
    from: request.body.from,
    to: request.body.to,
    date: request.body.date,
    picture: request.body.picture,
    group: request.params.id
  };

  console.log(expenseDoc);

  ExpenseModel.create(expenseDoc)
  .then(expense => {
    console.log('entrou');
    const group = GroupModel.findById(request.params.id).exec();
    const users = UserModel.find({ $or : [{ _id: request.body.from }, { _id: { $in: request.body.to } }]}).exec();
    Promise.all([group, users])
    .then(data => {
      data[0].expenses.push(expense._id);
      data[0].save();

      data[1].forEach(element => {
        element.expenses.push(expense._id);
        element.save();
      })
      response.status(200).json(expense);
    })
  })
  .catch(error => {
    response.send(error)
  });
};

module.exports = createExpense;