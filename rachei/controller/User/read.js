const UserModel = require('../../model/User/UserModel');

const bcrypt = require("bcrypt");

const readAllUsers = (request, response) => {
  console.log(request.session.user);
  UserModel.find({})
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    response.log(error);
  });
};

const readAllUsersGroup = (request, response) => {
  console.log(request);
  UserModel.find({ groups: request.params.id })
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    response.log(error);
  });
};

const readUser = (request, response) => {
  UserModel.findOne({ _id: request.params.id })
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    response.log(error);
  });
};

module.exports = { 
  readAllUsers,
  readAllUsersGroup,
  readUser,
} 