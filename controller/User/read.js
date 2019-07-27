const UserModel = require('../../model/User/UserModel');

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
  UserModel.find({ groups: request.params.id })
  .populate('groups')
  .then(data => {
    response.status(200).json(data);
  })
  .catch(error => {
    response.status(500).json(error);
  });
};

const readUser = (request, response) => {
  UserModel.findOne({ _id: request.params.id })
  .then(data => {
    response.status(200).json(data);
  })
  .catch(error => {
    response.status(500).json(error);
  });
};

module.exports = { 
  readAllUsers,
  readAllUsersGroup,
  readUser,
} 