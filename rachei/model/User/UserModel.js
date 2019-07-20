const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserModel = mongoose.model('User', new Schema({
  username: { type: String, unique: true },
  password: String,
  name: String,
  surname: String,
  cpf: { type: String, unique: true },
  email: { type: String, unique: true },
  expenses: Array,
  groups: Array,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}));

module.exports = UserModel;