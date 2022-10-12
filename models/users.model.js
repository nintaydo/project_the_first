const db = require("../db/connection");

function selectUsers() {
  const sqlString = `SELECT * FROM users;`;
  return db.query(sqlString).then((result) => {
    return result.rows;
  });
}

module.exports = { selectUsers };
