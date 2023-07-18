require('dotenv').config()
const express = require("express")
const body_parser = require('body-parser')

const cors = require("cors")

const app = express()
app.use(body_parser.json())
app.use(body_parser.urlencoded({ extended: true }))

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API." });
});

const routes = require('./routes/articles.route.js')(app)

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = routes