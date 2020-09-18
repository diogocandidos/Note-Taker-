// Dependencies
var express = require("express");



// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);


// Starts the server to begin listening
app.listen(PORT, function(err){ 
    if (err) console.log(err); 
    console.log("Server listening on PORT" + PORT); 
});  


