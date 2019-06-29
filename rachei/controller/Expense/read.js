const ExpenseModel = require('../../model/User/ExpenseModel');

const readAllExpensesGroup = (request, response) => {
  ExpenseModel.find({ busca: 'todas as despesas do grupo' })
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    console.log(error);
  });
};

const readAllExpensesUser = (request, response) => {
  ExpenseModel.find({ busca: 'todas as despesas do usuário' })
  .then(data => {
    response.send(data);
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