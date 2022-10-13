const db = require("../db/connection");

function selectArticle() {
  const sqlString = `SELECT * FROM articles;`;
  return db.query(sqlString).then((result) => {
    return result.rows;
  });
}

function selectArticleById(article_id) {
  return db
    .query(`SELECT * FROM articles
    JOIN comments ON  WHERE article_id = $1`, [article_id])
    .then(({ rows }) => {
      return rows[0];
    });
}

function updateArticleById(article_id, votes) {
  
  newVotes = 100
  votes = { inc_votes: newVotes };
  console.log(newVotes, "second in model");
  return db
    .query(`UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;`, [
      newVotes,
      article_id,
    ])
    .then(({ rows }) => {
      
      return rows[0];
    });
}

module.exports = { selectArticle, selectArticleById, updateArticleById };
