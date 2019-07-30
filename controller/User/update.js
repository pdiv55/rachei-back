const UserModel = require('../../model/User/UserModel');
const bcrypt = require('bcrypt');

const bcryptSalt = 10;

const updateUser = (request, response) => {
  const userDoc = {
    username: request.body.username,
    name: request.body.name,
    surname: request.body.surname,
    cpf: request.body.cpf,
    email: request.body.email,
  };

  if (request.body.password) {
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(userDoc.password, salt);
  
    userDoc.password = hashPass;
  }

  UserModel.findOneAndUpdate({ _id: request.params.id }, userDoc)
  .then(data => {
    response.status(200).json(data);
  })
  .catch(error => {
    console.status(500).json(error);
    console.log(error);
  });
};

module.exports = { 
  updateUser,
} 