var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

// create express app
var app = express();

//cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useMongoClient: true
});

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})

// entry route
app.get('/', function(req, res){
    res.json({"message": "Welcome !!!"});
});

require('./app/routes/note.routes.js')(app);

// listen for requests
app.listen(8080, function(){
    console.log("Server is listening on port 8080");
});