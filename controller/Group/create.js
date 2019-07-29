const GroupModel = require('../../model/Group/GroupModel');
const UserModel = require('../../model/User/UserModel');
const mongoose = require('mongoose');

const createGroup = (request, response) => {
  const date = new Date();
  const day = date.getDate();
  const month = parseInt(date.getMonth())+1;
  const year = date.getFullYear();

  const creationDate = `${day}/${month}/${year}`;

  const groupDoc = {
    name: request.body.name,
    description: request.body.description,
    users: request.body.users,
    currency: request.body.currency,
    expenses: request.body.expenses,
    creationDate: creationDate
  };

  GroupModel.create(groupDoc)
  .then(group => {
    UserModel.updateMany({}, { $push: { groups: group._id }})
    .where('_id').in(groupDoc.users)
    .exec()
    .then(users => {
      console.log(users);
      response.status(200).json(group);
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch(error => {
    response.status(500).send(error)
  });
};

module.exports = createGroup;