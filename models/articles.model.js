const db = require("../db/connection");

function selectArticle() {
  const sqlString = `SELECT * FROM articles;`;
  return db.query(sqlString).then((result) => {
    
    return result.rows;
  });
}

function selectArticleById(article_id) {
  return db
    .query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      console.log(rows);

      return rows[0];
    });
}

module.exports = { selectArticle, selectArticleById };
