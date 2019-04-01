let router = require('express').Router()

//Come up with a more detailed design of the application for each user here

router.get('/', function (req, res) {
    res.send('Fetch the word that the user has to see and send the page that shows the word as a card');
})

router.get('/details/:word', function (req, res) {
    let word = req.param.word;
    res.send('Get the details such as definition and examples and serve the page with the details')
})

router.get('/*', function (req, res) {
    res.redirect(req.baseUrl + '/');
})

module.exports = router;