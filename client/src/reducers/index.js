import { combineReducers } from "redux";
import { toolsReducers } from "./tools/toolsReducers";
import  postReducers  from "./tools/postReducers";
import  userReducers  from "./tools/userReducers";

export default combineReducers({
    toolsReducers,
    postReducers,
    userReducers
})