// require our dependencies
const express = require('express');
const mongoose = require('mongoose');
const classes = require('./models/classes');
const schedule = require('./models/scheduler');
const seed = require('./models/seed');
const bodyParser = require('body-parser');
const methodOverride = require("method-override")
const session = require("express-session")
const isAuthenticated = require('./utils/auth');
// initialize the express app
const app = express();
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"))
// configure server settings
require('dotenv').config();
// establish a connection to MongoDB

// connection to .env database url
const DATABASE_URL = process.env.DATABASE_URL;

// client connection method
mongoose.connect(DATABASE_URL);

// connection instance shortcut variable
const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

// connection message
db.on('connected', () => console.log(`Connected to the ${db.name} database on port:${db.port}`));
db.on('error', () => console.log(`Uh Oh! Mongodb had and error ${error.message}`));

// mount middleware
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }))
// Middleware
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
)
app.use(express.urlencoded());

const sessionsController = require("./controllers/sessions")
app.use("/sessions", sessionsController)

const userController = require("./controllers/users")
app.use("/users", userController)

const classController = require("./controllers/classes")
app.use("/classes", classController);

// mount our routes
// WELCOME PAGE
app.get('/' , (req, res) => {
    res.render("welcome.ejs", {
      currentUser: req.session.user
    });
});


// tell the server to listen for requests from the client
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Express is listening on port:${port}`); 
});