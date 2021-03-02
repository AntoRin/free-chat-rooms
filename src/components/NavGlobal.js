import {Link} from "react-router-dom";
import "../nav-global.css";
import "../nav-bar.css";

function NavGlobal() {
  return (
    <div className="nav-global">
      <div className="nav-global-left">
        <Link className="router-link-special" to="/">
          Chatrooms
        </Link>
      </div>
      <div className="nav-global-right">
        <Link className="router-link" to="/">
          Home
        </Link>
        <Link className="router-link" to="/public-chatrooms/live">
          Public Chat Rooms
        </Link>
      </div>
    </div>
  );
}

export default NavGlobal;
