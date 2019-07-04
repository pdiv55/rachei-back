const GroupModel = require('../../model/Group/GroupModel');

const createGroup = (request, response) => {
  const groupDoc = {
    name: request.body.name,
    description: request.body.description,
    users: request.body.users,
    currency: request.body.currency,
    expenses: request.body.expenses,
  };

  console.log(groupDoc);

  GroupModel.create(groupDoc)
  .then(jawbreaker => {
    response.send(jawbreaker);
  })
  .catch(error => {
    response.send(error)
  });
};

module.exports = createGroup;