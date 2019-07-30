const GroupModel = require('../../model/Group/GroupModel');
const UserModel = require('../../model/User/UserModel');

const updateGroup = (request, response) => {
  const groupDoc = {
    name: request.body.name,
    description: request.body.description,
    users: request.body.users,
  };

  GroupModel.findOneAndUpdate({ _id: request.params.id }, groupDoc)
  .then(data => {
    UserModel.updateMany({ $and: [{ _id: { $in: groupDoc.users } }, { groups: { $ne: request.params.id } }]}, { $push: { groups: data._id }})
    .then(users => {
      console.log(users);
      response.status(200).json({data, message: 'Grupo atualizado com sucesso'});
    })
    .catch(err => {
      console.log(err);
    })
    response.send(data);
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports = { 
  updateGroup,
} 