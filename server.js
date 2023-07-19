require('dotenv').config()
const express = require("express")
const body_parser = require('body-parser')
const cookies = require('cookie-parser')


const cors = require("cors")

/* deklarasi variable app menggunakan express 
  sebagai server */

const app = express()
app.use(cookies())
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

/* app server route */
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API." });
});

/* import articles route */
const appRouter = require('./routes/routes.js')(app)

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app
