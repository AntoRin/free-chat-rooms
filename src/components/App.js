import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import LandingPage from "./LandingPage";
import RoomForm from "./RoomForm";
import PublicRoomsForm from "./PublicRoomsForm";
import AllPublicRooms from "./AllPublicRooms";
import ChatRoom from "./ChatRoom";
import CTACard from "./CTACard";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/public-chatrooms" exact component={PublicRoomsForm} />
          <Route
            path="/public-chatrooms/live"
            exact
            component={AllPublicRooms}
          />
          <Route path="/private-chatrooms" exact component={RoomForm} />
          <Route path="/chatrooms/:room/:roomId" exact component={ChatRoom} />
          <Route path="/test" component={CTACard} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
