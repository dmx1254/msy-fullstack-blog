import React from "react";
import "./sidebar.css";
import { useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import { useContext } from "react";
import { UidContext } from "../context/contextApi";

const Sidebar = () => {
  const uid = useContext(UidContext)
  const { user, loading } = useSelector((state) => state.userReducers);

  if(loading) return <CircularProgress />
  return uid && (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">À PROPOS DE MOI</span>
        <img src={user && user.selectedFile} alt="profil" />
        <p>
          {
            user && user.bio
          }
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">Music</li>
          <li className="sidebarListItem">Sport</li>
          <li className="sidebarListItem">Style</li>
          <li className="sidebarListItem">Tech</li>
          <li className="sidebarListItem">Voyage</li>
          <li className="sidebarListItem">Science</li>
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">SUIVEZ NOUS</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
