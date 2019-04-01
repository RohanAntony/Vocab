let fs = require('fs')

let express = require('express')
let app = express();
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

let CONFIG_JSON = JSON.parse(fs.readFileSync('./config.json'))

let admin = require('./admin')
let word = require('./word')

app.use(express.static('public'))
app.set('view engine', 'pug')

app.use('/admin', admin)
app.use('/word', word)

app.get('/*', function (req, res) {
    res.send('Home page')
})

app.listen(CONFIG_JSON.PORT);