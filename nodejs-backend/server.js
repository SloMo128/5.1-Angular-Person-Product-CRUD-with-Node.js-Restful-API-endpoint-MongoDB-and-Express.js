// get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize the Express framework and obtain the Express-Object for set-up the "app" 
const app = express();

// Parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Enable CORS for all HTTP methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configuring the database
const config = require('./Config/config');

// Because we will use Model.findOneAndUpdate() function for our HTTP PUT/DELETE operations,
// we set to false the deprecated use of Mongoose `findAndModify()` in MongoDB driver's.
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

// Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true, dbName: "clusterANGULAR"
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Default route setting
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to CRUD Product App" });
});

// Activate all possible routes for all REST endpoints and their CRUD operations Employee
const apiPersonURL = require('./Routes/routes.person');
app.use(config.apiPersonURL, apiPersonURL);

// Activate all possible routes for all REST endpoints and their CRUD operations UserProfile
const apiProductURL = require('./Routes/routes.product');
app.use(config.apiProductURL, apiProductURL);

// Activate all possible routes for all REST endpoints and their CRUD operations UserLogin
const apiUserLoginURL = require('./Routes/routes.user.login');
app.use(config.apiUserLogin, apiUserLoginURL);


// Find 404 and hand over to error handler
app.use('*', function (req, res) {
    res.status(404).send('This is NOT a valid HTTP URL for API RESTful communication!');
});

// ERROR HANDLER
app.use(function (err, req, res, next) {
    console.error(err.message);                     // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500;      // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message);   // All HTTP requests must have a response, so let's send back an error with its status code and message
});

// Listen on port
app.listen(config.serverport, () => {
    console.log("Server is listening on port: " + config.serverport);
});

//const MongoDBConn = require('./utility/MongoDB.server.startup');
//MongoDBConn.connectToMongoDB();
