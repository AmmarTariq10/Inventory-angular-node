const express = require('express'); // routing middleware for http requests
const app = express(); // instance of express
const bodyParser = require('body-parser'); // http request body parser for json, urlencoded etc
const cors = require('cors');

const apiport = 9090;

app.use(bodyParser.json()); // added parsing functionality for json request body

app.use(bodyParser.urlencoded({extended: true})); // added extended parsing functionality for urlencoded request body
app.use(cors());

require('./routes/sales')(app);
require('./routes/inventory')(app);

app.listen(apiport, () => {
    console.log('The server is live on ' + apiport);
});