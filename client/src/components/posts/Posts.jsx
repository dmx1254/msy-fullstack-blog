import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Post from "../post/Post";
import "./posts.css";

const Posts = () => {
  const { posts, loading } = useSelector((state) => state.postReducers);

  if (loading) return <CircularProgress />;
  return (
    <div className="posts">
      {posts && posts.map((post) => <Post post={post} key={post._id} />)}
    </div>
  );
};

export default Posts;
