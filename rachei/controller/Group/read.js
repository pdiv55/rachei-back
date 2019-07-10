const GroupModel = require('../../model/Group/GroupModel');

const readAllGroups = (request, response) => {
  GroupModel.find()
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    response.log(error);
  });
};

const readMyGroups = (request, response) => {
  GroupModel.find({ users: request.params.id })
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    response.log(error);
  });
};

const readGroup = (request, response) => {
  GroupModel.findOne({ _id: request.params.id })
  .then(data => {
    response.send(data);
  })
  .catch(error => {
    response.log(error);
  });
};

module.exports = { 
  readAllGroups,
  readGroup,
  readMyGroups,
} 