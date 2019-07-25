const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const sgMail = require('@sendgrid/mail');
const UserModel = require('../model/User/UserModel');

const forgotPassword = (request, response, next) => {
  UserModel.findOne({ email: request.params.email })
  .then(user => {
    if (!user) {
      response.status(400).json({ message: 'Usuário não existe' });
    }
    const token = crypto.randomBytes(20).toString('hex');

    sgMail.setApiKey(process.env.SENDGRID_PASSWORD);

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    user.save(err => {
      if (err) {
        response.status(500).json(err);
        return;
      }
    })

    const mailOptions = {
      to: user.email,
      from: 'passwordreset@rachei.com.br',
      subject: 'Reset de senha no Rachei!',
      html: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        request.headers.origin + '/new-password/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    };

    sgMail.send(mailOptions)
    .then(() => {
      response.status(200).json({ message: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
    }) 
    .catch(error => {
      console.log(error.toString());
    })
  })
}

router.post('/forgot/:email', forgotPassword);

const resetPassword = (request, response) => {
  UserModel.findOne({ resetPasswordToken: request.params.token, resetPasswordExpires: { $gt: Date.now() } })
  .then(user => {
    if (!user) {
      response.status(500).json({ message: 'Token de reset de senha inválido ou expirado!' });
    }
    response.status(200).json(user);
  })
};

router.get('/reset/:token', resetPassword);

module.exports = router;