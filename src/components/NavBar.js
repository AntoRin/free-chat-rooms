import { useState } from "react";
import "../nav-bar.css";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import SettingsIcon from "@material-ui/icons/Settings";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CloseIcon from "@material-ui/icons/Close";

function NavBar({ username, openRoomDetails }) {
  const [sideBar, setSideBar] = useState(false);

  function openDetails() {
    openRoomDetails(true);
  }

  function closeDetails() {
    openRoomDetails(false);
  }

  return (
    <nav>
      <div className="user-name-nav">{username}</div>
      <div className="room-details-btn">
        <button className="icon-safe" onClick={() => setSideBar(true)}>
          <MoreVertIcon />
        </button>
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
            <button className="icon-safe mg-bt">
              <SettingsIcon />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
