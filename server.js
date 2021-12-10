// Import express package
const express = require('express');
const PORT = 3001;
const app = express();
const path = require("path");
const html = require("./routes/htmlRoutes");
const api = require ("./routes/apiRoutes");
const uuid = require('./helpers/uuid');

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
//adds front-end files
app.use(express.static("public"));

app.use(html);
app.use(api);


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
