const mongoose = require('mongoose');

const { Schema } = mongoose;

const ExpenseModel = mongoose.model('Expense', new Schema({
  name: String,
  value: Number,
  currency: String,
  from: String,
  to: Array,
  group: String,
  picture: String,
  date: Date,
  category: String,
  creationDate: { type: Date, default: Date.now },
  bill: String,
}));

module.exports = ExpenseModel;