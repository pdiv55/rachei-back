const GroupModel = require('../../model/Group/GroupModel');

const updateGroup = (request, response) => {
  GroupModel.findOneAndUpdate({ _id: request.params.id }, { update: 'mudanças do grupo' })
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    console.log(error);
  });
};

module.exports = { 
  updateGroup,
} 