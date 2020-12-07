import React, { useState, useEffect } from "react";
import Axios from "axios";

const Signup = (props) => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const signupUser = (event) => {
    event.preventDefault();

    Axios
      .post("http://localhost:3000/auth/signup", user)
      .then((response) => {
        props.history.push("/login");
      })
      .catch(err => console.log(err));
  }

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={signupUser}>
        <input
          name="email"
          type="string"
          onChange={handleChange}
          placeholder="email"
          value={user.email}
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="password"
          value={user.password}
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;