import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovieForm = (props) => {


  const [movieUpdate, setMovieUpdate] = useState({
    title: "",
    director: "",
    image: "",
    description: ""
  })

  useEffect(() => {
    axios
      .get(`http://localhost:3000/movie/${props.match.params.id}`)
      .then((res) => {
        setMovieUpdate(res.data)
      })
  }, [])

  const handleChange = (event) => {
    setMovieUpdate({
      ...movieUpdate,
      [event.target.name]: event.target.value,
    });
  }

  const updateMovie = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:3000/movie/${movieUpdate._id}`, movieUpdate)
      .then((response) => {
        console.log("Movie updated from React!!");
        debugger;
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <div>
      <form onSubmit={updateMovie}>
        <input
          type="text"
          name="title"
          placeholder={movieUpdate.title}
          value={movieUpdate.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder={movieUpdate.director}
          value={movieUpdate.director}
          onChange={handleChange}
        />
        <input
          type="text"
          name="image"
          placeholder={movieUpdate.image}
          value={movieUpdate.image}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder={movieUpdate.description}
          value={movieUpdate.description}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;