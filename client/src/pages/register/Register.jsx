import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";
import FileBase from "react-file-base64";
// import { useDispatch } from "react-redux";

const Register = () => {
  let conErr = useRef();
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [playOne, setPlayOne] = useState(false);
  const pseudoError = useRef();
  const mailError = useRef();
  const passwordError = useRef();
  const confirmPasswordError = useRef();
  // const dispatch = useDispatch();

  const handleSubmit = (e) => {
    // dispatch({type: 'STARTLOADING', payload: { loading: true }})
    e.preventDefault();
    if (pseudo && password) {
      if (pseudo.length < 3) {
        pseudoError.current.innerHTML =
          "Le pseudo doit faire 3 caractéres au minimum";
      } else {
        pseudoError.current.innerHTML = "";
      }

      if (password < 8) {
        passwordError.current.innerHTML =
          "Le mot de passe doit faire au caractéres au minimum";
      } else if (password !== confirmpassword) {
        confirmPasswordError.current.innerHTML =
          "Les mots de passes ne correspondent pas";
      } else {
        passwordError.current.innerHTML = "";
        confirmPasswordError.current.innerHTML = "";
      }
      axios({
        method: "POST",
        url: "http://localhost:5000/api/user/register",
        data: {
          pseudo,
          email,
          password,
          selectedFile,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.errors) {
          pseudoError.current.innerHTML = res.data.errors.pseudo;
          mailError.current.innerHTML = res.data.errors.email;
        } else {
          // setPlayOne(true);
          window.location = "/login";
          setPseudo("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
      });
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">S'inscrire</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label id="labpic">Pseudo</label>
        <input
          type="text"
          className="registerInput"
          name="pseudo"
          id="pseudo"
          placeholder="pseudo"
          onChange={(e) => setPseudo(e.target.value)}
        />
        <div className="registererrmail" ref={pseudoError}></div>
        <label id="labpic">Email</label>
        <input
          type="email"
          className="registerInput"
          name="email"
          id="email"
          placeholder="votre email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="registererrmail" ref={mailError}></div>
        <label id="labpic">Mot de passe</label>
        <input
          type="password"
          className="registerInput"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="registererrmail" ref={passwordError}></div>
        <label id="labpic">Confirmer mot de passe</label>
        <input
          type="password"
          className="registerInput"
          name="password"
          id="confirmpassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="registererrmail" ref={confirmPasswordError}></div>
        <div className="filebaseinput">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setSelectedFile(base64)}
          />
        </div>

        <div
          style={{
            color: "red",
          }}
          ref={conErr}
        ></div>
        <input type="submit" value="S'inscrire" className="registerButton" />
        {playOne && (
          <div className="success">
            Inscription réussie, veuillez vous{" "}
            <Link to="/login" className="loginsuccess">
              connecter
            </Link>
          </div>
        )}
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Se connecter
        </Link>
      </button>
    </div>
  );
};

export default Register;
