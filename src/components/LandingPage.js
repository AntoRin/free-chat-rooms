import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavGlobal from "./NavGlobal";
import CTACard from "./CTACard";
import { Button } from "@material-ui/core";
import { BiJoystickButton } from "react-icons/bi";
import "../landing-page.css";

function LandingPage() {
  const nextSection = useRef();
  const history = useHistory();

  useEffect(() => {
    nextSection.current.style.display = "none";
  });

  function redirectPrivate() {
    history.push("/private-chatrooms");
  }

  function redirectPublic() {
    history.push("/public-chatrooms");
  }

  function scrollSection() {
    nextSection.current.style.display = "block";
    nextSection.current.scrollIntoView();
  }

  return (
    <div className="landing-container">
      <NavGlobal />
      <div className="cta">
        <CTACard
          clickHandler={scrollSection}
          className="card-control"
          text="Create a public or a private chat room, or participate in one of the
          available public rooms."
          iconNum={1}
        />
        <CTACard
          clickHandler={scrollSection}
          className="card-control"
          text="Create a private room and share credentials or link with a friend to get started"
          iconNum={2}
        />
        <CTACard
          clickHandler={scrollSection}
          className="card-control"
          text="Neither your chats nor your sessions are stored. No other information other than your username is required."
          iconNum={3}
        />
        <div className="cta-redirect" onClick={scrollSection}>
          <p>Get Started</p>
          <BiJoystickButton className="cta-effect-btn" />
        </div>
      </div>
      <div ref={nextSection} className="landing-card-wrapper">
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
    </div>
  );
}

export default LandingPage;
