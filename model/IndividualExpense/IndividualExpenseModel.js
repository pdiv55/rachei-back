const mongoose = require('mongoose');

const { Schema } = mongoose;

const IndividualExpenseModel = mongoose.model('IndividualExpense', new Schema({
  value: Number,
  currency: String,
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: { type: Schema.Types.ObjectId, ref: 'User' },
  expense: { type: Schema.Types.ObjectId, ref: 'Expense' },
  creationDate: { type: Date, default: Date.now },
  bill: String,
}));

module.exports = IndividualExpenseModel;