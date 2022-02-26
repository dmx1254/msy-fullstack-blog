import * as actionsTypes from "../constants/Contants";
import axios from "axios";

export const readPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: actionsTypes.GET_POST_REQUEST });

    const { data } = await axios({
      method: "get",
      url: "http://localhost:5000/api/post",
      withCredentials: true,
    });

    dispatch({ type: actionsTypes.GET_ALL_POSTS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "post",
      url: "http://localhost:5000/api/post",
      withCredentials: true,
      data: postData,
    });

    dispatch({ type: actionsTypes.CREATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

// export const getOnePost = (uid) => async (dispatch) => {
//   try {
//     dispatch({ type: actionsTypes.GET_SINGLE_POST_REQUEST });

//     const { data } = await axios({
//       method: "get",
//       url: `http://localhost:5000/api/post/single/${uid}`,
//       withCredentials: true,
//     });

//     dispatch({ type: actionsTypes.GET_SINGLE_POST, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

export const deletePost = (id) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "delete",
      url: `http://localhost:5000/api/post/${id}`,
      withCredentials: true,
    });

    dispatch({ type: actionsTypes.DELETE_SINGLE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addLikes = (uid) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "put",
      url: "http://localhost:5000/api/post/addlikes/"+uid,
      withCredentials: true,
    });
    dispatch({ type: actionsTypes.ADD_LIKE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (uid, postData) => async (dispatch) => {
  try {
    const { data } = await axios({
      method: "put",
      url: `http://localhost:5000/api/post/${uid}`,
      withCredentials: true,
      data: postData,
    });

    dispatch({ type: actionsTypes.UPDATE_SINGLE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
};
