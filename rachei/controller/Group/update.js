const GroupModel = require('../../model/Group/GroupModel');

const updateGroup = (request, response) => {
  const group = request.body
  GroupModel.findOneAndUpdate({ _id: request.params.id }, group)
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