import React, { useEffect, useState } from "react";
import "./singlePost.css";
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import logo from "../../assets/bul.jpg";
// import { deletePost, getOnePost } from "../../actions/postActions";
import { Link } from "react-router-dom";

const SinglePost = ({ id }) => {
  const [deleteOne, setDeleteOne] = useState(false);
  const dispatch = useDispatch();
  // console.log(id)
  // useEffect(() => {
  //   if (id) dispatch(getOnePost(id));
  // }, [id, dispatch]);

  const { post, loading } = useSelector((state) => state.postReducers);
  const { user } = useSelector((state) => state.userReducers);
  // console.log(post);

  const handleDelete = () => {
   
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

  if (loading) return <CircularProgress />;
  return (
    <>
      {deleteOne ? (
        <div>
          <p>
            Post supprimé avec succés. <br />
            Voulez-vous{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "#05d7ff",
              }}
              to="/write"
            >
              créer un autre post
            </Link>{" "}
            ou aller à{" "}
            <Link
              style={{
                textDecoration: "none",
                color: "#05d7ff",
              }}
              to="/"
            >
              l'accueil
            </Link>{" "}
          </p>
        </div>
      ) : (
        <div className="singlePost">
          <div className="singlePostWrapper">
            <img
              src={post && post.picture ? post.picture : logo}
              alt="post"
              className="singlePostImg"
            />
            <h1 className="singlePostTitle">
              {post && post.title}
              <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit"></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            </h1>
            <div className="singlePostInfo">
              <span className="singlePostAuthor">
                Author: <b>{user && user.pseudo}</b>
              </span>
              <span className="singlePostDate">
                {post && convertDate(post.date)}
              </span>
            </div>
            <p className="singlePostDesc">{post && post.message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SinglePost;
