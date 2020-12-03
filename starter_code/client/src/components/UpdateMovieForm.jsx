import React, { useState } from 'react';
import axios from 'axios';

const UpdateMovieForm = () => {

  const [movieSearch, setMovieSearch] = useState({
    title: ""
  })

  const [movieUpdate, setMovieUpdate] = useState({
    title: "",
    director: "",
    image: "",
    description: ""
  })

  const getMovie = (event) => {
    event.preventDefault();

    axios
      .get("http://localhost:3000/movies", { params: { title: movieSearch.title } })
      .then((response) => {
        debugger;
      })
  }

  const handleSearchChange = (event) => {
    setMovieSearch({
      ...movieSearch,
      [event.target.name]: event.target.value,
    });
  }

  const handleChange = (event) => {
    setMovieUpdate({
      ...movieUpdate,
      [event.target.name]: event.target.value,
    });
  }

  const updateMovie = (event) => {
    event.preventDefault();

    axios
      .put("http://localhost:3000/movies", movieUpdate)
      .then((response) => {
        console.log("Movie updated from React!!");
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <form onSubmit={getMovie}>
        <input
          type="text"
          name="title"
          placeholder="which movie?"
          value={movieSearch.title}
          onChange={handleSearchChange}
        />
        <button typ="submit">Search</button>
      </form>
      <form onSubmit={updateMovie}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={movieUpdate.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder="director"
          value={movieUpdate.director}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="image"
          value={movieUpdate.image}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={movieUpdate.description}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;