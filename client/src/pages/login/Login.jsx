import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  // const [loading, setLoading] = useState(true);
  const emailError = useRef();
  const passwordError = useRef();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch({type: 'STARTLOADING', payload: { loading: true }})
    axios({
      method: "post",
      url: "http://localhost:5000/api/user/login",
      withCredentials: true,
      data: {
        email,
        password,
      },
    }).then((res) => {
      console.log(res);
      if (res.data.email || res.data.password) {
        emailError.current.innerHTML = res.data.email;
        passwordError.current.innerHTML = res.data.password;
      } else {
        window.location = "/";
      }
    }).catch((error) => console.log(error))
  };

  return (
    <div className="login">
      <span className="loginTitle">Se connecter</span>
      <form className="loginForm" onSubmit={handleLogin}>
        <label id="label_login" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          className="loginInput"
          name="email"
          id="email"
          placeholder="votre email"
          value={email}
          onChange={(e) => setMail(e.target.value)}
        />
        <div className="loginerrmail" ref={emailError}></div>
        <label id="label_login" htmlFor="password">
          Mot de passe
        </label>
        <input
          type="password"
          className="loginInput"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="loginerrmail" ref={passwordError}></div>
        <input type="submit" value="Se connecter" className="loginButton"/>
      </form>
      <button className="loginRegisterButton">
        <Link to="/register" className="link">
          S'inscrire
        </Link>
      </button>
    </div>
  );
};

export default Login;
