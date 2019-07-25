const UserModel = require('../../model/User/UserModel');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const createUser = (request, response) => {
  console.log(request.body);
  const userDoc = {
    username: request.body.username,
    name: request.body.name,
    surname: request.body.surname,
    cpf: request.body.cpf,
    email: request.body.email,
    password: request.body.password,
  };

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(userDoc.password, salt);

  userDoc.password = hashPass;

  UserModel.create(userDoc)
  .then(data => {
    const message = 'Usuário criado com sucesso';
    response.send({data, message});
  })
  .catch(error => {
    response.send(error)
  });
};

module.exports = createUser;