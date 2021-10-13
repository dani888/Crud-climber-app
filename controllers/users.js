// Dependencies
const express = require("express")
const bcrypt = require("bcrypt")
const userRouter = express.Router()
const User = require("../models/user")

// New (registration page)
userRouter.get("/new", (req, res) => {
    res.render("users/new.ejs", {
      currentUser: req.session.user,
    })
  })

// Create (registration route)
userRouter.post("/", (req, res) => {
    //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  
    User.create(req.body, (error, createdUser) => {
      req.session.user = createdUser._id
      res.redirect("/sessions/new")
    })
  })

// Export User Router
module.exports = userRouter