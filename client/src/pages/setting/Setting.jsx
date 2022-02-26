import React, { useContext, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.css";
import { updatedUser, deleteUser } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import FileBase from "react-file-base64";
import { UidContext } from "../../components/context/contextApi";

const Setting = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [password, setPassword] = useState("Dmxosf12541");
  const [bio, setBio] = useState("");
  const { user, loading } = useSelector((state) => state.userReducers);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  console.log(user);
  console.log(uid);

  const updateUser = () => {
    const data = {
      pseudo,
      email,
      selectedFile,
      bio,
    };
    dispatch(updatedUser(uid, data));
  };
  const handleDelete = () =>{
    dispatch(deleteUser(uid));
    window.location.reload();
  }

  if (loading) return <CircularProgress />;
  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">
            Mettre à jour vos informations
          </span>
          <span className="settingsDeleteTitle" onClick={handleDelete}>Supprimer votre compte</span>
          <span>
            <textarea className="bio" placeholder="votre bio..." value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
          </span>
        </div>
        <form className="settingsForm">
          <label>Photo de profile</label>
          <div className="settingsPP">
            <img src={user && user.selectedFile} alt="profil" />
            <div id="lab__select">
              <label htmlFor="fileInput"> Modifier la photo de profile</label>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) => setSelectedFile(base64)}
              />
            </div>
            <input type="file" id="fileInput" style={{ display: "none" }} />
          </div>
          <label>Pseudo</label>
          <input
            type="text"
            value={pseudo}
            name="pseudo"
            id="pseudo"
            placeholder={user && user.pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder={user && user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Mot de Passe</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
          />
          <button className="settingsSubmit" onClick={updateUser}>
            Confirmer
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Setting;
