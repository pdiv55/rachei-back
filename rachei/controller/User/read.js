const UserModel = require('../../model/User/UserModel');

const bcrypt = require("bcrypt");

const readLoginUser = (request, response, next) => {
  console.log(request);
  const theUsername = request.body.username;
  const thePassword = request.body.password;

  UserModel.findOne({ username: theUsername })
  .then(user => {
    if (!user) {
      response.statusMessage =  "The username doesn't exist."
      response.status(209).send({
        message: "The username doesn't exist."
      });
      return;
    }

    if (bcrypt.compareSync(thePassword, user.password)) {
      // Save the login in the session!
      response.send({ user, message: 'Login efetuado com sucesso' });
    } else {
      response.send({
        message: "Senha incorreta"
      });
    }
  })
  .catch(error => {
    response.send(error);
  })
};

const readAllUsers = (request, response) => {
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
  readLoginUser
} 