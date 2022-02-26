import React, { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Topbar from "./components/topbar/Topbar";
import Setting from "./pages/setting/Setting";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { UidContext } from "./components/context/contextApi";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./components/loading/Loading";
import LogoutLoading from "./components/logout/LogoutLoading";
import { getUser } from "./actions/userActions";
import SinglePost from "./components/singlePost/SinglePost";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  // console.log(uid)
  const { loading } = useSelector((state) => state.toolsReducers);
  const { logout } = useSelector((state) => state.toolsReducers);

  useEffect(() => {
    const fetUid = async () => {
      axios({
        method: "GET",
        url: "http://localhost:5000/jwtid",
        withCredentials: true,
      })
        .then((res) => setUid(res.data))
        .catch(() => console.log("No token"));
    };
    fetUid();
    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Router>
        {loading && <Loading />}
        {logout && <LogoutLoading />}
        <Topbar />
        <Switch>
          <Route exact path="/">
            {uid ? <Home /> : <Login />}
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/write">
            {uid ? <Write /> : <Register />}
          </Route>
          <Route exact path="/settings">
            <Register />
          </Route>
          <Route exact path="/post/:id" component={Single} />
          <Route exact path="/setting/:id">
            {uid ? <Setting /> : <Register />}
          </Route>
        </Switch>
      </Router>
    </UidContext.Provider>
  );
};

export default App;
