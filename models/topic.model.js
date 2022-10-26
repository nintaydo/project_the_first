const db = require('../db/connection');



function selectTopic(){
   
    const sqlString = `SELECT * FROM topics;`;
    return db.query(sqlString)
    .then((result) => {
        console.log(result.rows)
        return result.rows;
    })
};

module.exports = {selectTopic};