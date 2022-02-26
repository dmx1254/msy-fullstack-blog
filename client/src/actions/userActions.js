import axios from "axios";
import * as actionsTypes from "../constants/Contants";

export const getUser = (uid) => async (dispatch) => {
  try {
    dispatch({ type: actionsTypes.GET_USER_REQUEST });

    const { data } = await axios({
      method: "get",
      url: `http://localhost:5000/api/user/${uid}`,
      withCredentials: true,
    });
    dispatch({ type: actionsTypes.GET_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatedUser = (uid, postData) => async (dispatch) => {
  try {
    dispatch({ type: actionsTypes.UPDATE_USER_REQUEST });

    const { data } = await axios({
      method: "put",
      url: `http://localhost:5000/api/user/${uid}`,
      withCredentials: true,
      data: postData,
    });

    dispatch({ type: actionsTypes.UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteUser = (uid) => async (dispatch) => {
  try {
    dispatch({ type: actionsTypes.DELETE_USER_REQUEST });

    const { data } = await axios({
      method: "delete",
      url: `http://localhost:5000/api/user/${uid}`,
      withCredentials: true,
    });

    dispatch({ type: actionsTypes.DELETE_USER, payload: data });
  } catch (error) {
      console.log(error);
  }
};
