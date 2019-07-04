const UserModel = require('../../model/User/UserModel');

const readAllUsers = (request, response) => {
  UserModel.find({})
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    console.log(error);
  });
};

const readAllUsersGroup = (request, response) => {
  UserModel.find({ groups: request.params.id })
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    console.log(error);
  });
};

const readUser = (request, response) => {
  UserModel.findOne({ _id: request.params.id })
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports = { 
  readAllUsers,
  readAllUsersGroup,
  readUser
} 