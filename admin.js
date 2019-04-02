let router = require('express').Router();
let data = require('./Db/MongoStorage');

router.get('/add', function (req, res) {
    doc = {
        type: "Add"
    }
    console.log(doc)
    res.render('admin/add.pug', doc)
})

router.get('/update/:word', function (req, res) {
    data.detailsOfWord(req.params.word, (err, doc) => {
        doc.type = "Update"
        console.log(doc)
        res.render('admin/add.pug', doc)
    })
})

router.post('/add', function (req, res) {
    console.log(req.body)
    data.insertOrUpdateWord(req.body.word, 
        req.body.definition, 
        req.body.example,
        function () {
            console.log(req.baseUrl + '/list')
            res.redirect(req.baseUrl + '/list')           
    })
})

router.get('/list', function (req, res) {
    console.log('/list')
    data.listWords((err, docs) => {
        console.log(docs)
        res.render('admin/list.pug', {
            list: docs
        })        
    })
})

router.get('/details/:word', function (req, res) {
    data.detailsOfWord(req.params.word, (err, doc) => {
        console.log(err, doc)
        res.render('admin/details.pug', doc)
    })
})

router.get('/delete/:word', function (req, res) {
    data.deleteWord(req.params.word, () => {
        res.redirect(req.baseUrl + '/list')
    })
})

router.get('/*', function (req, res) {
    res.redirect(req.baseUrl + '/add')
})

module.exports = router;