// LOAD DATA
// We are linking our routes to a series of "data" sources.

const fs = require("fs");
const noteInput = require("./db.json");

module.exports = (app) =>  {

    function createNote(notes){
        notes = JSON.stringify(notes);
        fs.writeFileSync("./db.json", notes, function(err){
            if (err) {
                return console.log(err);
            }
        });
    }

    app.get("/api/notes", function(req, res){
        res.json(noteInput);
    });
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
    app.post("/api/notes", function(req, res){
        if (noteInput.length == 0){
            req.body.id = "0";
        } else{
            req.body.id = JSON.stringify(JSON.parse(noteInput[noteInput.length - 1].id) + 1);
        }
        noteInput.push(req.body);
        createNote(noteInput);
        res.json(req.body);
    });
// Below code handles when users delete a note.
    app.delete("/api/notes/:id", function(req, res){
        let id = req.params.id.toString();
        for (i=0; i < noteInput.length; i++){
               if (noteInput[i].id == id){
               res.send(noteInput[i]);
                noteInput.splice(i,1);
                break;
            }
        }
        createNote(noteInput);

    });
};