const db = require("../db/connection");

function selectArticle() {
  const sqlString = `SELECT * FROM articles;`;
  return db.query(sqlString).then((result) => {
    return result.rows;
  });
}

function selectArticleById(article_id) {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles
    LEFT JOIN comments ON  articles.author = comments.author
    GROUP BY articles.article_id;`
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

function updateArticleById(article_id, votes) {
  return db
    .query(
      `UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;`,
      [votes, article_id]
    )
    .then(({ rows }) => {
      return rows[0];
    });
}

module.exports = { selectArticle, selectArticleById, updateArticleById };
