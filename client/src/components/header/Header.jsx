import React from "react";
import "./header.css";
import logo from "../../assets/msyproleu.jpeg";

const Header = () => {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">Sciences & Tech</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img src={logo} alt="logo" className="headerImg" />
    </div>
  );
};

export default Header;
