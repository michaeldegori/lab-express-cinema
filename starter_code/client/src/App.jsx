import React, { Component } from "react";
import Home from "./components/Home";
import { Link, Switch, Route } from 'react-router-dom';
import NewMovieForm from './components/NewMovieForm';
import Movies from './components/Movies';
import UpdateMovieForm from './components/UpdateMovieForm';
import MovieDetails from './components/MovieDetails'

const App = () => {
  return (
    <div className="App">
      <Link to="/">Home</Link>
      <Link to="/movies">Movies</Link>
      <Link to="/movie/new">Add New Movie</Link>
      <Link to="/movie/edit">Edit Movie</Link>

      <Switch>
        <Route exact path="/" render={(props) => <Home {...props} />} />
        <Route exact path="/movies" render={(props) => <Movies {...props} />} />
        <Route exact path="/movie/new" render={(props) => <NewMovieForm {...props} />} />
        <Route exact path="/movie/:id" render={(props) => <MovieDetails {...props} />} />
        <Route exact path="/movie/edit/:id" render={(props) => <UpdateMovieForm {...props} />} />
      </Switch>

    </div>
  );
}

export default App;
