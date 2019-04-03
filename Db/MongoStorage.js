const mongoose = require('mongoose');
const fs = require('fs')
const CONFIG_JSON = JSON.parse(fs.readFileSync('./config.json'))

mongoose.connect(CONFIG_JSON.MONGOOSE.CONNECT_STRING, { useNewUrlParser: true });

const WordDetails = mongoose.model('WordDetail', {
    word: String,
    definition: String,
    example: String
})

const insertOrUpdateWord = (word, definition, example, cb) => {
    console.log(word, definition, example)
    WordDetails.findOneAndUpdate({
        word: word
    },{
        word: word,
        definition: definition,
        example: example
    }, {
    upsert: true
    }, (err, doc) => {
        console.log(err, doc)
        cb(err, doc)
    })
}

const deleteWord = (word, cb) => {
    WordDetails.deleteOne({
        word: word
    }, cb)
}

const listWords = (query, cb) => {
    WordDetails.find(query, {
        '_id': 0
    }, function (err, docs) {
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