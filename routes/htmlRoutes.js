//=============================================
// DEPENDENCIES
// include the path module to allow the JS file to move to the correct path to the specified file
//=============================================
const path = require("path");

//=============================================
// ROUTING
//=============================================

module.exports = function(app) {

    // GET `/` is the index file or the About Me page:
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
 
    // GET "/music" shows the portfolio page
    app.get("/harvardart", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/harvardartmuseum.html"));
    });
    
    // GET "/contact" shows the Contact Me page
    app.get("/metropolitanart", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/metropolitanmuseumart.html"));
    });

    // GET "/thanks" shows the thank you page after someone submits a message on the contact form
    app.get("/locations", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/museumlocations.html"));
    });

};