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
        <Link className="router-link" to="/public-chatrooms">
          Public
        </Link>
        <Link className="router-link" to="/private-chatrooms">
          Private
        </Link>
      </div>
    </div>
  );
}

export default NavGlobal;
