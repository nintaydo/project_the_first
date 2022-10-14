const db = require("../db/connection");

function selectArticle(topic) {
  let querystr = `SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles
  LEFT JOIN comments ON articles.author = comments.author`;

  const newArray = [];
  if (topic) {
    newArray.push(topic);
    querystr += ` WHERE articles.topic = $1`;
  }

  querystr += ` GROUP BY articles.article_id
  ORDER BY created_at DESC;`;

  return db
    .query(querystr, newArray)

    .then((result) => {
      return result.rows[0];
    });
}

function selectArticleById(userArticle_id) {
  return db
    .query(
      `SELECT articles.*, COUNT(comments.article_id) AS comment_count FROM articles
    LEFT JOIN comments ON articles.author = comments.author
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
      [userArticle_id]
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
