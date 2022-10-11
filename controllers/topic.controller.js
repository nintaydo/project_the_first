const  { selectTopic } = require('../models/topic.model')

function getTopic(request, response, next) {
    
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