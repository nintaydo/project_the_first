const express = require("express");
// const apiRouter = require('./db/')???
const { getTopic } = require("./controllers/topic.controller");
const {
  getArticle,
  getArticleById,
} = require("./controllers/articles.controller")
const { getUsers } = require("./controllers/users.controller");

const app = express();

app.use(express.json());

app.get(`/api/topics`, getTopic);

app.get(`/api/articles`, getArticle);

app.get(`/api/articles/:article_id`, getArticleById);

app.get(`/api/users`, getUsers)

app.all(`/*`, (request, response) => {
  response.status(404).send({ msg: "Invalid Path" });
});

app.use((err, request, response, next) => {
  if (err.code === "22P02") {
    response.status(400).send({ msg: "Invalid id" });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  if (err.status) {
    response.status(err.status).send({ msg: err.message });
  } else {
    next(err);
  }
});

app.use((err, request, response, next) => {
  
  res.sendStatus(500);
});

// app.use((err, request, response, nest) => {
//     console.log(err)
//     response.status(400).send({msg: 'Bad Request'})
// })

module.exports = app;
