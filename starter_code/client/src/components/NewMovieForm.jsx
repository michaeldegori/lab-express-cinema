import React, { useState } from 'react';
import axios from 'axios';

const NewMovieForm = () => {

  const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    image: "",
    description: ""
  })


  const handleChange = (event) => {
    setNewMovie({
      ...newMovie,
      [event.target.name]: event.target.value,
    });
  }

  const addMovie = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/movies", newMovie)
      .then((response) => {
        console.log("Movie added from React!!");
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <form onSubmit={addMovie}>
        <input
          type="text"
          name="title"
          placeholder="title"
          value={newMovie.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder="director"
          value={newMovie.director}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder="image"
          value={newMovie.image}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="description"
          value={newMovie.description}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewMovieForm;