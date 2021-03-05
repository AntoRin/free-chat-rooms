import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import RoomForm from "./RoomForm";
import PublicRoomsForm from "./PublicRoomsForm";
import AllPublicRooms from "./AllPublicRooms";
import ChatRoom from "./ChatRoom";

function App() {
  const [activeRoom, setActiveRoom] = useState("");

  return (
    <Router>
      <div>
        <Switch>
          <Route
            path="/"
            exact
            render={props => <LandingPage {...props} activeRoom={activeRoom} />}
          />
          <Route
            path="/public-chatrooms"
            exact
            render={props => (
              <PublicRoomsForm {...props} activeRoom={activeRoom} />
            )}
          />
          <Route
            path="/public-chatrooms/live"
            exact
            render={props => (
              <AllPublicRooms {...props} activeRoom={activeRoom} />
            )}
          />
          <Route
            path="/private-chatrooms"
            exact
            render={props => <RoomForm {...props} activeRoom={activeRoom} />}
          />
          <Route
            path="/chatrooms/:room/:roomId"
            exact
            render={props => (
              <ChatRoom {...props} setActiveRoom={setActiveRoom} />
            )}
          />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
