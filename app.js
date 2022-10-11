const express = require('express');
// const apiRouter = require('./db/')???
const {getTopic} = require('./controllers/topic.controller');

const app = express();

app.use(express.json());

app.get('/api/topics', getTopic);

app.all('/*', (request, response) =>{
    response.status(404).send({msg: 'Invalid Path'})
})

// app.use((err, request, response, nest) => {
//     console.log(err)
//     response.status(400).send({msg: 'Bad Request'})
// })



module.exports = app;