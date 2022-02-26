import * as actionsTypes from "../../constants/Contants";
const initialState = { posts: [] };

export default function postReducers(state = initialState, action) {
  switch (action.type) {
    case actionsTypes.GET_POST_REQUEST:
      return {
        ...state,
        posts: [],
        loading: true,
      };

    case actionsTypes.CREATE_POST:
      return {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case actionsTypes.GET_ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case actionsTypes.GET_SINGLE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case actionsTypes.GET_SINGLE_POST:
      return {
        ...state,
        post: action.payload,
        loading: false,
      };

    case actionsTypes.DELETE_SINGLE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload._id),
      };

    case actionsTypes.ADD_LIKE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              likes: action.payload["likes"],
            };
          } else return post;
        }),
      };

    case actionsTypes.UPDATE_SINGLE_POST:
      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === action.payload._id) {
            return {
              ...post,
              message: action.payload.message,
            };
          } else return post;
        }),
      };

    default:
      return state;
  }
}
