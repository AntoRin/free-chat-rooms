import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../home.css";

function RoomForm() {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [roomName, setRoomName] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    let auth = await fetch("http://localhost:5000/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomName, password }),
    });
    let authToken = await auth.json();
    let roomId = authToken.token;
    let path = `/chatrooms/${roomName}/${roomId}`;
    history.push(path);
  }

  function handleChange(event) {
    if (event.target.id === "password") setPassword(event.target.value);

    if (event.target.id === "roomName") setRoomName(event.target.value);
  }

  return (
    <div className="user-form">
      <div className="user-details">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="room-name">Room Name:</label> <br />
            <input
              autoFocus="on"
              autoComplete="off"
              type="text"
              name="room-name"
              id="roomName"
              value={roomName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label> <br />
            <input
              autoComplete="off"
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" id="createRoom">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default RoomForm;
