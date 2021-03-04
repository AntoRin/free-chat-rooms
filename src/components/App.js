import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import RoomForm from "./RoomForm";
import PublicRoomsForm from "./PublicRoomsForm";
import AllPublicRooms from "./AllPublicRooms";
import ChatRoom from "./ChatRoom";

function App() {
  const [activeRoom, setActiveRoom] = useState("");
  console.log(activeRoom);
  return (
    <Router>
      <div>
        <Switch>
          <Route
            path="/"
            exact
            // component={LandingPage}
            render={props => <LandingPage {...props} activeRoom={activeRoom} />}
          />
          <Route
            path="/public-chatrooms"
            exact
            // component={PublicRoomsForm}
            render={props => (
              <PublicRoomsForm {...props} activeRoom={activeRoom} />
            )}
          />
          <Route
            path="/public-chatrooms/live"
            exact
            // component={AllPublicRooms}
            render={props => (
              <AllPublicRooms {...props} activeRoom={activeRoom} />
            )}
          />
          <Route
            path="/private-chatrooms"
            exact
            // component={RoomForm}
            render={props => <RoomForm {...props} activeRoom={activeRoom} />}
          />
          <Route
            path="/chatrooms/:room/:roomId"
            exact
            // component={ChatRoom}
            // setActiveRoom={setActiveRoom}
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
