const mongoose = require('mongoose');

const { Schema } = mongoose;

const GroupModel = mongoose.model('Group', new Schema({
  name: String,
  description: String,
  users: Array,
  currency: String,
  expenses: Array,
}));

module.exports = GroupModel;