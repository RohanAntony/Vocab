const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express();
const bodyParser = require('body-parser')

const logger = require('./logger');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const configJson = JSON.parse(fs.readFileSync('./config.json'))

const admin = require('./admin')
const word = require('./word')

app.use(express.static('public'));

app.use('/vocab/admin', admin)
app.use('/word', word)

app.get('/*', function (req, res) {
    logger.info('GET ' + req.originalUrl + ' Yet to determine where to redirect the base URL')
    res.send('Default URL, to be decided as to where it should redirect')
})

app.listen(configJson.port, configJson.ip, function () {
    logger.info('listening to PORT ' + configJson.port + ' IP ' + configJson.ip);
});