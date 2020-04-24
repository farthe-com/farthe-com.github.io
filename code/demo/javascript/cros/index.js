var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/', function (req, res) {
    res.send("hello")
})

app.listen(8080, function () {
    console.log('listening: http://127.0.0.1:8080/')
})