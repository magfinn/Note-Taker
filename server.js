const fs = require('fs');
const path = require("path");
const express = require('express');
// added notes object const
const notes = require('./db/db');
const html = require("./routes/htmlRoutes");
const api = require ("./routes/apiRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//adds front-end files
app.use(express.static("public"));

app.use(api);
app.use(html);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
