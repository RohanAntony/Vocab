const router = require('express').Router();
const path = require('path')
const data = require('./Db/MongoStorage');

router.get('/', function (req, res) {
    console.log(req.baseUrl);
    res.sendFile(path.join(__dirname, 'public', 'vocab/admin.html'))
})

router.post('/add', function (req, res) {
    console.log(req.body)
    data.insertOrUpdateWord(req.body.word, 
        req.body.def, 
        req.body.example,
        function () {
            res.send({
                'status': 'Success'
            })
    })
})

router.post('/list', function (req, res) {
    console.log('/list POST')
    data.listWords({
        word: {
            $regex: '^' + req.body.word
        }
    }, (err, docs) => {
        for (let index = 0; index < docs.length; index++) {
            console.log(index)
            docs[index].def = docs[index].definition;
            delete docs[index].definition;
            console.log(docs[index])
        }
        console.log(docs);
        res.send(docs);
    })
})

router.post('/delete', function (req, res) {
    let word = req.body.word;
    data.deleteWord(word, () => {
        res.send({
            'status': 'Success'
        })
    })
})

router.get('/*', function (req, res) {
    console.log(req.baseUrl + '/')
    res.redirect(req.baseUrl + '/')
})

module.exports = router;