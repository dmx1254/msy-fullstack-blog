import React from "react";
import "./post.css";
import poster from "../../assets/bul.jpg";
import { AiOutlineLike } from "react-icons/ai";
// import { useSelector } from "react-redux";
// import { CircularProgress } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { addLikes, deletePost, updatePost } from "../../actions/postActions";
import { useState } from "react";

const Post = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userReducers);
  const [message, setMessage] = useState(post.message);
  const [editToggle, setEditToggle] = useState(false);
  const [stopanim, setStopAnim] = useState(false);
  const [verifAnnul, setVerifAnnul] = useState(false);

  const hadleEditToggle = () => {
    setEditToggle(true);
  };

  const convertDate = (date) => {
    const myDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });

    return myDate;
  };

  const handleDelete = () => {
    dispatch(deletePost(post._id));
  };

  const addLikeToPost = () => {
    dispatch(addLikes(post._id));
  };

  const handleAnnuler = () => {
    setEditToggle(false);
    setStopAnim(false);
  };

  const handleSendUpdatedMessage = () => {
    setStopAnim(true);
    const data = {
      message,
    };

    setTimeout(() => {
      dispatch(updatePost(post._id, data));
      setEditToggle(false);
      setStopAnim(false);
    }, 3000);
  };

  return (
    <div className="post">
      <img
        className="postImg"
        src={post.picture ? post.picture : poster}
        alt="profil"
      />
      <div className="postInfo">
        <div className="postCats">
          <div className="likes">
            <span>
              <AiOutlineLike
                onClick={addLikeToPost}
                style={{
                  cursor: "pointer",
                  color: post.likes < 1 && "#172b4d",
                }}
              />
            </span>{" "}
            {post.likes > 0 && post.likes}
          </div>
          <span className="postCat">Music</span>
          <span className="postCat">Voyage</span>
          {user._id === post.posterId && (
            <div className="singlePostEdit">
              <i
                className="singlePostIcon far fa-edit"
                onClick={hadleEditToggle}
              ></i>
              <i
                className="singlePostIcon far fa-trash-alt"
                onClick={handleDelete}
              ></i>
            </div>
          )}
        </div>
        <span className="postTitle">{post.title && post.title}</span>
        <hr />
        <span className="postDate">{post.date && convertDate(post.date)}</span>
      </div>
      {editToggle ? (
        <>
          <textarea
            autoFocus
            className="edit__area"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {stopanim ? (
            <>
              <p className="stopupdating"></p>
              <button className="annul" onClick={handleAnnuler}>
                Annuler Modification
              </button>
              <button
                className="successin"
                onClick={handleSendUpdatedMessage}
                style={{
                  margin: "5px 10px",
                }}
              >
                Valider modifications
              </button>
            </>
          ) : (
            <button className="successin" onClick={handleSendUpdatedMessage}>
              Valider modifications
            </button>
          )}
        </>
      ) : (
        <p className="postDesc">{message}</p>
      )}
    </div>
  );
};

export default Post;
