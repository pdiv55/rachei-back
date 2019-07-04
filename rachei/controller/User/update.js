const UserModel = require('../../model/User/UserModel');

const updateUser = (request, response) => {
  UserModel.findOneAndUpdate({ _id: request.params.id }, { update: 'mudanças do usuário' })
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports = { 
  updateUser,
} 