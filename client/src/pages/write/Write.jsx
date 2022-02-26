import React, { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import msyproleu from "../../assets/msyproleu.jpeg";
import { UidContext } from "../../components/context/contextApi";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../actions/postActions";
const Write = () => {
  const uid = useContext(UidContext);
  const [picture, setPicture] = useState("");
  const [posterId, setPosterId] = useState(uid);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducers);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      posterId,
      title,
      message,
      picture,
    };
    dispatch(createPost(data));
  };

  return (
    <div className="write">
      <img src={user && user.selectedFile} alt="logo" className="writeImg" />
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Titre"
            className="writeInput"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="file__picture">
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPicture(base64)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Racontez votre histoire..."
            type="text"
            name="message"
            className="writeInput writeText"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <input type="submit" value="publier" className="writeSubmit" />
      </form>
    </div>
  );
};

export default Write;
