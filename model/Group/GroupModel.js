const mongoose = require('mongoose');

const { Schema } = mongoose;

const GroupModel = mongoose.model('Group', new Schema({
  name: String,
  description: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  currency: String,
  expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
  creationDate: String,
}));

module.exports = GroupModel;