import * as actionsTypes from "../../constants/Contants";
const initialState = {};

export default function userReducers(state = initialState, action) {
  switch (action.type) {
    case actionsTypes.GET_USER_REQUEST:
      return {
        ...state,
        user: {},
        loading: true,
      };
    case actionsTypes.GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case actionsTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionsTypes.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case actionsTypes.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.DELETE_USER:
      return {
        ...state,
        user: state.user.filter((user) =>
          user._id ? user._id !== action.payload.id : user
        ),
        loading: false,
      };

    default:
      return state;
  }
}
