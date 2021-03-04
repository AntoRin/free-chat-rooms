import {useState} from "react";
import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";
import NavGlobal from "./NavGlobal";
import "../public-rooms-form.css";

function PublicRoomsForm() {
  const [roomName, setRoomName] = useState("");
  const history = useHistory();

  function handleChange(event) {
    setRoomName(event.target.value);
  }

  function handleRedirect() {
    history.push("/public-chatrooms/live");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let auth = await fetch("/auth/token", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({roomName}),
    });
    let authToken = await auth.json();
    let roomId = authToken.token;
    let path = `/chatrooms/${roomName}/${roomId}`;
    history.push(path);
  }

  return (
    <div className="user-form">
      <NavGlobal />
      <div className="user-details">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="room-name">Room Name:</label> <br />
            <input
              autoComplete="off"
              required
              pattern="[A-Za-z0-9_]+"
              maxLength="15"
              title="Letters, numbers and underscore"
              type="text"
              name="room-name"
              id="roomName"
              value={roomName}
              onChange={handleChange}
            />
          </div>
          <button type="submit" id="createRoom">
            Create
          </button>
        </form>
        <div className="public-rooms-redirect">
          <p className="redirect-btn-simple" onClick={handleRedirect}>
            Browse Public Rooms
          </p>
        </div>
      </div>
    </div>
  );
}

export default PublicRoomsForm;
