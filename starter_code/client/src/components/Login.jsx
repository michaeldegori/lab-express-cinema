import React, { useState, useEffect } from "react";
import Axios from "axios";

const Login = (props) => {

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loginUser = (event) => {
    event.preventDefault();

    Axios
      .post("http://localhost:3000/auth/login", user)
      .then(res => localStorage.setItem("token", res.data.token))
      .catch(err => console.log(err))
  }

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;