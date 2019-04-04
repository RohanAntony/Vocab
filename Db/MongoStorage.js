const mongoose = require('mongoose');
const fs = require('fs')
const configJson = JSON.parse(fs.readFileSync('./config.json'))

const logger = require('../logger')

mongoose.connect(configJson.mongoose.connectString, { useNewUrlParser: true }).then(
    () => { 
        logger.info('Connected to mongodb using mongoose successfully')
    },
    err => {
        logger.err('Error while connecting to mongoDB ' + JSON.stringify({
            err: err
        }))
    }
)

const WordDetails = mongoose.model('WordDetail', {
    word: String,
    definition: String,
    example: String
})

const insertOrUpdateWord = (word, definition, example, cb) => {
    logger.debug(word, definition, example)
    WordDetails.findOneAndUpdate({
        word: word
    },{
        word: word,
        definition: definition,
        example: example
    }, {
    upsert: true
    }, (err, doc) => {
        if (err)
            logger.err("Err while inserting/updating object: " + JSON.stringify(err))
        cb(err, doc)
    })
}

const deleteWord = (word, cb) => {
    WordDetails.deleteOne({
        word: word
    }, (err) => {
        if (err)
            logger.err("Err while deleting the word: " + word + " Error:" + JSON.stringify(err))
        cb(err)
    })
}

const listWords = (query, cb) => {
    WordDetails.find(query, {
        '_id': 0
    }, function (err, docs) {
        if (err)
            logger.err("Error while listing words which match: " + query + " Error: " + JSON.stringify(err))
        cb(err, docs)
    }).limit(10);
}

const detailsOfWord = (word, cb) => {
    WordDetails.where({
        word: word
    }).findOne(cb);
}

module.exports = {
    insertOrUpdateWord: insertOrUpdateWord,
    deleteWord: deleteWord,
    listWords: listWords,
    detailsOfWord: detailsOfWord
}