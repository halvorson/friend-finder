
// Initialize required packages
var express = require("express");
var bodyParser = require("body-parser");

// Express set up
var app = express();
var port = process.env.PORT || 3000;

// bodyParser should be expecting a url encoded form
app.use(bodyParser.urlencoded({ extended: true }));

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

app.listen(port, function() {
	console.log("App listening on PORT " + port);
});