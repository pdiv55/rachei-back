const UserModel = require('../../model/User/UserModel');

const updateUser = (request, response) => {
  const userDoc = {
    username: request.body.username,
    name: request.body.name,
    surname: request.body.surname,
    cpf: request.body.cpf,
    email: request.body.email,
  };

  console.log(request.body);
  UserModel.findOneAndUpdate({ _id: request.params.id }, user)
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    response.log(error);
  });
};

module.exports = { 
  updateUser,
} 