const  { selectTopic } = require('../models/topic.model')

function getTopic(request, response, next) {
   const topic = request.query.topic
    selectTopic()
    .then((topics) => {
        response.status(200).send({topics})
    })
    .catch((err)=>{
        console.log(err)
        next(err)
    });
}

module.exports = {getTopic}