//=============================================
// SETUP AND OBTAIN DEPENDENCIES
//=============================================

const express = require("express")

//=============================================
// CREATE AND CONFIGURE SERVER
// Set up the basic properties of the server
//=============================================

// Create the "express" server:
const app = express();

// Sets the initial Port that the server will listen through for client-side requests.
// process.env.PORT is a command that means that the server will listen to whatever number is in the environmental variable PORT. 
const PORT = process.env.PORT || 4000

// Sets up the Express app to handle data parsing using middleware.
// json and urlencoded are both part of bodyParse in Express: https://github.com/expressjs/body-parser
app.use(express.urlencoded({ extended: true}));
app.use(express.json()); 

// Creates a middleware function in which to server files from a given root directory.
app.use(express.static("public"));


//=============================================
// BUILD ROUTES
// Creates route files that directs the server to take certain actions when users visit or request data from various URLs 
//=============================================

// HTML Routes:
require("./routes/htmlRoutes")(app);

//=============================================
// START LISTENER
// The code below starts our software server. Almost like initializing a function after creating the function.
//=============================================

app.listen(PORT, function() {
    console.log(`Listening on Port: ${PORT}`)
} )