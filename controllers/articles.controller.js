const {
  selectArticle,
  selectArticleById,
} = require("../models/articles.model");

function getArticle(request, response, next) {
  selectArticle()
    .then((articles) => {
      response.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
}

function getArticleById(request, response, next) {
  const article_id = request.params.article_id;

  selectArticleById(article_id)
    .then((article) => {
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticle, getArticleById };
