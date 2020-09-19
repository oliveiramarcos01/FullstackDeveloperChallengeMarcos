const path = require('path');    
const express = require('express'); 
const fs = require('fs');
const util = require('util');
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;   
const app = express();
const mongoClient = require("mongodb").MongoClient;


console.log(process.env.MONGO_PORT_27017_TCP_ADDR);

//set up localhost mongoDB connection
mongoClient.connect("mongodb://root:1vacanaovoa@database:27017/?authSource=challengedb&readPreference=primary&appname=MongoDB%20Compass&ssl=false", { useUnifiedTopology: true, useNewUrlParser: true})
  .then(conn => {
    console.log("DB load success!");
    global.conn = conn.db("challengedb");
  }).catch(err => {
    console.log(err)}
);

//set up mustache view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set("view options", { layout: true });
app.engine("html", require("mu3"));

// Set up our express aplication
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

//load Routes and API
fs.readdirSync('./api').forEach(function (file) { require(util.format('%s/%s/%s', '.', 'api', file))(app); });
fs.readdirSync('./routes').forEach(function (file) { require(util.format('%s/%s/%s', '.', 'routes', file))(app); });


//Starting server on port 8080
app.listen(port, () => {
    console.log('Server started PORT: ' + port);
});