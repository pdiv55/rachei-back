const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExpenseModel = mongoose.model('Expense', new Schema({
  name: String,
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  individualExpenses: [{ type: Schema.Types.ObjectId, ref: 'IndividualExpense' }],
  picture: String,
  date: Date,
  category: String,
  creationDate: { type: Date, default: Date.now },
}));

module.exports = ExpenseModel;