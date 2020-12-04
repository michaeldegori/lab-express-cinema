import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieDetails = (props) => {

  const [movie, setMovie] = useState({})


  useEffect(() => {
    axios
      .get(`http://localhost:3000/movie/${props.match.params.id}`)
      .then((res) => {
        setMovie(res.data);
      })
  }, [])

  // console.log(movie);


  return (
    <div>
      <h1>{movie.title}</h1>
      <img src={movie.image} alt="" />
      <Link to={`/movie/edit/${movie._id}`}>Edit</Link>
    </div>
  );
};

export default MovieDetails;