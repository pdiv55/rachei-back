const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExpenseModel = mongoose.model('Expense', new Schema({
  name: String,
  value: Number,
  currency: String,
  from: { type: Schema.Types.ObjectId, ref: 'User' },
  to: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  group: { type: Schema.Types.ObjectId, ref: 'Group' },
  picture: String,
  date: Date,
  category: String,
  creationDate: { type: Date, default: Date.now },
  bill: String,
}));

module.exports = ExpenseModel;