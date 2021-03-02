import {useState} from "react";
import {Link} from "react-router-dom";
import "../nav-bar.css";
import NameModal from "./NameModal";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import SettingsIcon from "@material-ui/icons/Settings";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";

function NavBar({username, openRoomDetails, setUser}) {
  const [sideBar, setSideBar] = useState(false);
  const [settings, setSettings] = useState(false);

  function openDetails() {
    openRoomDetails(true);
  }

  function closeDetails() {
    openRoomDetails(false);
  }

  return (
    <nav>
      <div className="user-name-nav">{username}</div>
      <div className="nav-links-menu">
        <Link className="router-link" to="/">
          Home
        </Link>
        <Link className="router-link" to="/public-chatrooms/live">
          Public Chat Rooms
        </Link>
        <div className="room-details-btn">
          <button className="icon-safe" onClick={() => setSideBar(true)}>
            <MoreVertIcon />
          </button>
        </div>
      </div>
      {sideBar && (
        <div className="side-nav">
          <div className="side-nav-close-btn">
            <CloseIcon onClick={() => setSideBar(false)} />
          </div>
          <div className="side-btns">
            <button
              className="icon-safe mg-bt"
              onClick={openDetails}
              onBlur={closeDetails}
            >
              <LocalCafeIcon />
            </button>
            <button
              className="icon-safe mg-bt"
              onClick={() => setSettings(true)}
            >
              <SettingsIcon />
            </button>
          </div>
        </div>
      )}
      {settings && (
        <NameModal
          setUser={setUser}
          label="New Name:"
          changeName={true}
          setSettings={setSettings}
        />
      )}
      {settings && (
        <CloseIcon
          className="modal-closer"
          onClick={() => setSettings(false)}
        />
      )}
    </nav>
  );
}

export default NavBar;
