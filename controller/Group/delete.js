const GroupModel = require("../../model/Group/GroupModel");

const deleteGroup = (request, response) => {
  GroupModel.deleteOne({ _id: request.params.id })
    .then(data => {
      response.send(data);
    })
    .catch(error => {
      response.send(error);
    });
};

module.exports = deleteGroup;
