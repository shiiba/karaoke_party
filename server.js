// requirements
var express = require('express');
var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var mongoUri = process.env.MONGODB_URI || "mongodb://localhost/tube_karaoke";
var ejs = require('ejs');
var port = process.env.PORT || 3000;

// middleware
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

// database
mongoose.connect(mongoUri);

// controllers
var roomsController = require('./controllers/rooms.js');
app.use('/rooms', roomsController);

// listen
app.listen(port);
console.log('==============');
console.log('listening on port ' + port);
console.log('==============');
