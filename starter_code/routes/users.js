const express = require("express");
const app = express();
const User = require("../models/User");
var jwt = require('jsonwebtoken');

app.post('/signup', (req, res) => {
  User
    .create({
      email: req.body.email,
      password: req.body.password
    })
    .then(user => {
      res.status(200).send("User created")
    })
    .catch(err => {
      res.status(500).send("Error!")
    })
})

app.post('/login', (req, res) => {
  User
    .findOne({
      email: req.body.email
    })
    .then(user => {
      if (!user) res.status(403).send("Invalid Login Info");
      else if (user.password === req.body.password) {
        let token = jwt.sign({ id: user._id }, 'secret');
        res.json({ token: token })
      } else res.status(403).send("Invalid Credentials");
    })
})

module.exports = app;