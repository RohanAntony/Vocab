const fs = require('fs')
const path = require('path')

let express = require('express')
let app = express();
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

let CONFIG_JSON = JSON.parse(fs.readFileSync('./config.json'))

let admin = require('./admin')
let word = require('./word')

app.use(express.static('public'));


app.use('/vocab/admin', admin)
app.use('/word', word)

app.get('/*', function (req, res) {
    res.send('Default URL, to be decided as to where it should redirect')
})

app.listen(CONFIG_JSON.PORT, CONFIG_JSON.IP);