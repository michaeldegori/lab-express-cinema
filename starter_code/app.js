require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const jwt = require('jsonwebtoken');
const cors = require("cors");
const Movie = require('./models/Movie')
const User = require('./models/User')

app.options('*', cors())
app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const index = require("./routes/index");
app.use("/", index);

mongoose
  .connect("mongodb://localhost/starter-code", { useNewUrlParser: true })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  // .then(() => {
  //   Movie.insertMany(movies)
  //     .then(movies.map(movie => console.log(movie.title)))
  // })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

app.get('/movies', (req, res) => {
  Movie.find()
    .then(films => {
      res.json(films);
    })
    .catch(err => console.log(err))
})

app.get('/movie/:id', (req, res) => {
  Movie
    .findById(req.params.id)
    .then(movie => {
      res.json(movie)
    })
    .catch(err =>
      console.log(err)
    )
})

app.post('/movies', (req, res) => {

  const token = req.headers.authorization.split(' ')[1];
  if (!token) res.status(403).send("Unauthenticated");

  const decoded = jwt.verify(token, "secret");
  if (!decoded) res.status(403).send("Unauthenticated");

  User.findById(decoded.id).then(user => {
    if (!user) res.status(403).send("Unauthenticated");
    else {
      Movie.create(req.body)
        .then(movie => {
          res.send("Movie Created!")
        })
        .catch(err =>
          console.log(err)
        )
    }
  })
})

app.put('/movies', (req, res) => {

  const token = req.headers.authorization.split(' ')[1];
  if (!token) res.status(403).send("Unauthenticated");

  const decoded = jwt.verify(token, "secret");
  if (!decoded) res.status(403).send("Unauthenticated");

  User.findById(decoded.id).then(user => {
    if (!user) res.status(403).send("Unauthenticated");
    else {
      Movie.findOneAndUpdate(req.body)
        .then(movie => {
          res.send("Movie Updated!")
        })
        .catch(err =>
          console.log(err)
        )
    }
  })
})

app.use("/auth", require("./routes/users"));

app.listen(3000, () => {
  console.log('Running...')
})

module.exports = app;
