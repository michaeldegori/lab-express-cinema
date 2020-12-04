import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Movies = (props) => {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3000/movies`)
      .then((res) => {
        setMovies(res.data);
      })
  })

  const listMovies = () => {
    return (movies.map(movie => {
      return (
        <div>
          <h1>{movie.title}</h1>
          <img src={movie.image} alt="" />
          <Link to={`/movie/${movie._id}`}>See Details</Link>
        </div>
      )
    })
    )
  }

  return (
    <div>
      {listMovies()}
    </div>
  );
};

export default Movies;