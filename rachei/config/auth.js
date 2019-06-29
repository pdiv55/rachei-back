const bcrypt = require('bcrypt');

const UserModel = require('../model/User/UserModel');

const localStrategy = (passport) => {
  passport.use(
    new LocalStrategy((email, password, done) => {
      //Match user
      UserModel.findOne({ email: email })
      .then(user => {
        if(!user) {
          return done(null, false, {message: 'O email não está cadastrado.'})
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

  passport.serializeUser((user, done) => {
    done(null, user.id);
  })
  
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
  })
}

module.exports = localStrategy;