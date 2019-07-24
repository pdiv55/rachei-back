const express = require("express");
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const middleware = require('../config/middleware');
const UserModel = require('../model/User/UserModel');
const GroupModel = require('../model/Group/GroupModel');
const ExpenseModel = require('../model/Expense/ExpenseModel');

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
    const id = user._id.toString();
    const token = jwt.sign({ userId: id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '365d' }
    );
    const expenses = ExpenseModel.find({ $or:[{ from: id }, { to: id }]}).exec();
    const groups = GroupModel.find({ users: id }).exec();
    Promise.all([expenses, groups])
    .then(data => {
      request.login(user, (err) => {
        if (err) {
          response.status(500).json(err);
          return;
        }
        console.log(data);
        response.status(200).json({ user, data, token, message: 'Logou, vai time' });
      });
    })
    .catch(error => {
      console.log(error);
    })
    
  })(request, response, next);
};

router.post('/login', login);

router.get('/login', (request, response, next) => {
  response.send(request.user);
})

const refresh = (request, response, next) => {
  UserModel.findById(request.decoded.userId)
  .then(user => {
    response.status(200).json(user);
  })
  .catch(err => {
    response.status(400).json(err);
  })
}

router.get('/refresh', middleware, refresh);

const logout = (req, res, next) => {
  req.logout();
  console.log('entrou');
  req.session.destroy((err) => {
    console.log('entrou destroy');
    if(!err) {
      res.status(200).json('Usuário deslogado com sucesso');
    }
  })
}

router.get('/logout', middleware, logout);

module.exports = router;