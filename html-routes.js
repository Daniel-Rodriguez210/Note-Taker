// We need to include the path package to get the correct file path for our html
var path = require("path");

module.exports = (app) => {

// HTML GET Requests
// Below code handles when users "visit" a page.
// In each of the below cases the user is shown an HTML page of content  

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/assets/index.html"));
  });

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/assets/notes.html"));
  });

};

