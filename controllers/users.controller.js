const { selectUsers } = require("../models/users.model");

function getUsers(request, response, next) {
  selectUsers()
    .then((users) => {
      response.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getUsers };
