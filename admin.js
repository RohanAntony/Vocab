const router = require('express').Router();
const path = require('path')
const data = require('./Db/MongoStorage');
const logger = require('./logger')

router.get('/', function (req, res) {
    logger.info('GET /');
    res.sendFile(path.join(__dirname, 'public', 'vocab/admin.html'))
    logger.debug('Sending file vocab/admin.html')
})

router.post('/add', function (req, res) {
    logger.info('POST ' + req.originalUrl + " Adding: " + req.body.word)
    data.insertOrUpdateWord(req.body.word, 
        req.body.def, 
        req.body.example,
        function () {
            logger.info('{"status": "Success"}')
            res.send({
                'status': 'Success'
            })
    })
})

router.post('/list', function (req, res) {
    logger.info('POST ' + req.originalUrl + " Listing: " + req.body.word)
    data.listWords({
        word: {
            $regex: '^' + req.body.word
        }
    }, (err, docs) => {
        logger.debug("Found " + docs.length + " documents");
        res.send(docs);
    })
})

router.post('/delete', function (req, res) {
    let word = req.body.word;
    logger.info('POST ' + req.originalUrl + " Deleting: " + word)
    data.deleteWord(word, () => {
        logger.debug('{ "status" : "Success"  }');
        res.send({
            'status': 'Success'
        })
    })
})

router.get('/*', function (req, res) {
    logger.info('GET ' + req.originalUrl + ' Redirecting: ' + req.baseUrl)
    res.redirect(req.baseUrl + '/')
})

module.exports = router;