import React, { useContext, useEffect, useState } from "react";
import "./topbar.css";
import logo from "../../assets/user.png";
import { Link } from "react-router-dom";
import { UidContext } from "../context/contextApi";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

const Topbar = () => {
  const uid = useContext(UidContext);
  // console.log(uid);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.toolsReducers);
  // console.log(loading)
  // console.log(data);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT", payload: { logout: true } });
    axios({
      method: "GET",
      url: "http://localhost:5000/api/user/logout",
      withCredentials: true,
    }).then(() => {
      dispatch({ type: "ENDLOGOUT", payload: { logout: false } });
      window.location = "/login"
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios({
        method: "GET",
        url: `http://localhost:5000/api/user/${uid}`,
        withCredentials: true,
      }).then((res) => {
        setData(res.data);
        dispatch({ type: "ENDLOADING", payload: { loading: false } });
      });
    };
    fetchData();
  }, [uid, dispatch, loading]);

  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              Accueil
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              About
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              Contact
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              Créer
            </Link>
          </li>

          <li className="topListItem">
            {uid ? (
              <span onClick={handleLogout}>Se deconnecter</span>
            ) : (
              <span>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  to="/login"
                >
                  Se connecter
                </Link>
              </span>
            )}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {loading ? (
          <CircularProgress />
        ) : (
          <Link to={`/setting/${uid}`}>
            {uid && (
              <img
                className="topImg"
                src={data.selectedFile ? data.selectedFile : logo}
                alt="logo"
              />
            )}
          </Link>
        )}
        <i className="topIconSearch fas fa-search"></i>
      </div>
    </div>
  );
};

export default Topbar;
