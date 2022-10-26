const {
  selectArticle,
  selectArticleById,
  updateArticleById,
} = require("../models/articles.model");

function getArticle(request, response, next) {
  console.log(request.query.topic, "<----First in control")
  selectArticle(request.query.topic)
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

function getArticleById(request, response, next) {
  const userArticle_id = request.params.userArticle_id;
  selectArticleById(userArticle_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

function patchArticleById(request, response, next) {
  const article_id = request.params.article_id;

  const votes = request.body.inc_votes;

  updateArticleById(article_id, votes)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticle, getArticleById, patchArticleById };
