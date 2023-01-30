var express = require('express')
var app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.set('view engine','ejs')

require('./routing/rout')(app)

app.use((err,req,res,next) => {
    res.end('Problem...')
    console.log(err)
}) 


//app.use(express.static('static'))
var server = app.listen(3000, function() {
    console.log('Listening on 3000')
})

 