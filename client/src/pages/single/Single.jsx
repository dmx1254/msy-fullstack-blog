import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import "./single.css";

const Single = (props) => {
  const id = props.match.params.id;
  return (
    <div className="single">
      <SinglePost id={id} />
      <Sidebar />
    </div>
  );
};

export default Single;
