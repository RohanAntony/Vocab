let DataStore = require('nedb');
let db = new DataStore()

/*
 {
    filename: 'F:\\NeDBData'
}
 */

//db.loadDatabase(function (err) {

    function insertOrUpdateWord(word, data, func) {
        db.update({
            word: word
        }, data, {
                upsert: true
         }, func)
    }

    function deleteWord(word, func) {
        db.remove({
            word: word
        }, {}, func)
    }

    function listWords(func) {
        db.find({}, func);
    }

    function detailsOfWord(word, func) {
        db.find({
            word: word
        }, (err, docs) => {
            func(err, docs[0])
        })
    }

    module.exports = {
        deleteWord: deleteWord,
        listWords: listWords,
        insertOrUpdateWord: insertOrUpdateWord,
        detailsOfWord: detailsOfWord
    }
//})