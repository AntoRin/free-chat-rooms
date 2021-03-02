import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import NavGlobal from "./NavGlobal";
import "../landing-page.css";

function LandingPage() {
  const history = useHistory();

  function redirectPrivate() {
    history.push("/private-chatrooms");
  }

  function redirectPublic() {
    history.push("/public-chatrooms");
  }
  return (
    <div className="landing-container">
      <NavGlobal />
      <div className="cta">
        <h2>
          Create a public or a private chat room, or peep in one of the
          available public rooms. Neither your chats nor your sessions are saved
          - everything is off the records.
        </h2>
      </div>
      <div className="landing-card">
        <header>
          <h1>Create/Join a Chat Room</h1>
        </header>
        <div className="nav-btns">
          <Button
            id="btn-safe-space"
            variant="contained"
            onClick={redirectPublic}
          >
            Public
          </Button>
          <Button
            id="btn-safe-space"
            variant="contained"
            color="default"
            onClick={redirectPrivate}
          >
            Private
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
