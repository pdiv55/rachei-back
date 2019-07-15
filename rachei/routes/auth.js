const express = require("express");
const router = express.Router();
const passport = require("../config/auth");
const bcrypt = require('bcrypt');
const ExpenseModel = require('../model/Expense/ExpenseModel');
const GroupModel = require('../model/Group/GroupModel');
const UserModel = require('../model/User/UserModel');

const bcryptSalt = 10;

const signup = (request, response) => {
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
    console.log('entrou');
    const message = 'Usuário criado com sucesso';
    response.json({data, message});
  })
  .catch(error => {
    console.log('entrou erro');
    response.json(error)
  });
};

router.post('/signup', signup);

const login = (request, response, next) => {
  passport.authenticate("local", (err, user, info) => {
    request.login(user, (err) => {
      console.log(request.user._id);
      console.log('logou');
      // const expenses = ExpenseModel.find({ $or:[{ from: request.user._id }, { to: request.user._id }]}).exec();
      // const groups = GroupModel.find({ users: request.user._id }).exec();
      // Promise.all([expenses, groups])
      // .then(data => {
      //   console.log(JSON.stringify(data));
      //   response.json({ data, message: 'Login foi feito com sucesso' });
      // })
      // .catch(error => {
      //   console.log(error);
      // })
      if (err) {
        response.status(500).json({ message: 'Deu ruim na session' });
      }

      response.status(200).json({ user, message: 'Logou, vai time' });
    });
  })(request, response, next);
};

router.post('/login', login);

router.get('/login', (request, response, next) => {
  console.log(request.user);
  response.send(request.user);
})

module.exports = router;