const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const UserModel = require('../model/User/UserModel');

passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  UserModel.findById(id).then((user) => {
      done(null, user);
  })
})

passport.use(
  new LocalStrategy((username, password, done) => {
    //Match user
    UserModel.findOne({ username: username })
    .then(user => {
      if(!user) {
        return done(null, false, {message: 'O usuário não está cadastrado.'})
      }

      //Match password
      bcrypt.compare(password, user.password, (err,isMatch) => {
        if(err) throw err;
        if(isMatch) {
          return done (null, user);
        } else {
          return done (null, false, {message: 'Senha incorreta'})
        }
      });
    })
    .catch(err => console.log(err));
  })
);

module.exports = passport;