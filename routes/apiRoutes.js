var fs = require("fs");
var path = require("path");

module.exports = function (app) {
    
    //GET
    
    app.get("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8",
            function (err, data) {
                if (err) throw err;
                var db = JSON.parse(data);
                res.json(db);
            })
    });
    
    
    //POST 

    app.post("/api/notes", function (req, res) {
        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8",
            function (err, data) {
                if (err) throw err;
                var db = JSON.parse(data);
                var newNote = [];
                db.push(req.body);

                //FOR LOOP
                for (var i = 0; i < db.length; i++) {
                    var newInfo = {
                        title: db[i].title,
                        text: db[i].text,
                        id: i
                    };

                    newNote.push(newInfo);
                }

                fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newNote, null, 2), (err) => {
                    if (err) throw err;
                    res.json(req.body);
                });

            })
    });


    //DELETE

    app.delete("/api/notes/:id", function (req, res) {
        var noteID = req.params.id;
        console.log(noteID);

        var newNote = [];

        fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", function (err, data) {
            if (err) throw err;
            var db = JSON.parse(data);

            for (var i = 0; i < db.length; i++) {
                if (i !== noteID) {
                    var newInfo = {
                        title: db[i].title,
                        text: db[i].text,
                        id: newNote.length
                    };
                }
                newNote.push(newInfo);
            }
        });

        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(newNote, null, 2), function (err) {
            if (err) throw err;
            res.json("Note deleted");
        });
    });

};
