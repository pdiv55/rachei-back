const UserModel = require('../../model/User/UserModel');

const updateUser = (request, response) => {
  const user = request.body
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