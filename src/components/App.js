import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RoomForm from "./RoomForm";
import ChatRoom from "./ChatRoom";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={RoomForm} />
          <Route path="/chatrooms/:room/:roomId" exact component={ChatRoom} />
          <Route path="/" component={RoomForm} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
