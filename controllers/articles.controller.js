const {
  selectArticle,
  selectArticleById,
  updateArticleById,
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
  const userArticle_id = request.params.article_id;
  console.log(userArticle_id, "In the controller");
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
  const newVotes = 100
  const votes = { inc_votes: newVotes}

  updateArticleById(article_id, votes)
    .then((article) => {
      
      response.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { getArticle, getArticleById, patchArticleById };
