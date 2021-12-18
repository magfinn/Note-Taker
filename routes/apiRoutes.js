const fs = require('fs');
const util = require('util');
const notes = require('../db/db.json');
//middleware for express
const router = require("express").Router()
// Helper method for generating unique ids
const uuid = require('../helpers/uuid');
//makes readFile asynchronous
const readFileAsync = util.promisify(fs.readFile)

//read db.json file and reutrn all saved notes as JSON
router.get('/api/notes', (req, res) => {
  // res.json(`${req.method} request received to get notes`);
  // console.log(`${req.method} request received to get notes`);

  readFileAsync('./db/db.json', 'utf8') .then((data) => {
    console.log(data);
    res.json(JSON.parse(data));
  })
});

//POST request to add a note
router.post('/api/notes', (req, res) => {
  console.info(`${req.method} request received to add a note`);

  //destructure assignment for the items in req.body
  const {
    title,
    text
  } = req.body;

  //if all the required properties are present
  if (title && text) {
    //variable for the object that will be saved
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    //obtain existing notes
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      //if error, log error
      if (err) {
        console.error(err);
        // if no errors, parse data, push notes, and write file.
      } else {
        //convert string into JSON object
        const parsedNotes = JSON.parse(data);

        //add a new note
        parsedNotes.push(newNote);

        //write updated notes back to the file
        fs.writeFile(
          './db/db.json', JSON.stringify (parsedNotes, null, 4),
              (writeErr) =>
              writeErr 
              ? console.error(writeErr) 
              :console.log ('Succes in updating notes!')
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.json(response);
  } else {
    res.json('Error in posting review');
  }
});


module.exports = router;