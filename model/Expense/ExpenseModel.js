const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExpenseModel = mongoose.model('Expense', new Schema({
  name: String,
  value: String,
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  to: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  individualExpenses: [{ type: Schema.Types.ObjectId, ref: 'IndividualExpense' }],
  picture: String,
  date: String,
  category: String,
  creationDate: { type: Date, default: Date.now },
}));

module.exports = ExpenseModel;