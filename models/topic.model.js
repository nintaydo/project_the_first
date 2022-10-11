const db = require('../db/connection');


function selectTopic(){
   
    const sqlString = `SELECT * FROM topics;`;
    return db.query(sqlString)
    .then((result) => {
        return result.rows;
    })
};

module.exports = {selectTopic};