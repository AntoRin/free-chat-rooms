import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavGlobal from "./NavGlobal";
import ActiveChat from "./ActiveChat";
import "../home.css";

function RoomForm({ activeRoom }) {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [roomName, setRoomName] = useState("");
  const [activeChat, setActiveChat] = useState("");

  useEffect(() => {
    setActiveChat(activeRoom);
  }, [activeRoom]);

  async function handleSubmit(event) {
    event.preventDefault();
    let auth = await fetch("/auth/token", {
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
      <NavGlobal />
      <div className="user-details">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="room-name">Room Name:</label> <br />
            <input
              autoComplete="off"
              pattern="[A-Za-z0-9_]+"
              maxLength="15"
              title="Letters, numbers and underscore"
              required
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
              pattern="[A-Za-z0-9-_.,!@]+"
              title="Letters, numbers and -_.,!@"
              required
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
      {activeChat && activeChat !== "" ? (
        <ActiveChat roomLink={activeChat} />
      ) : null}
    </div>
  );
}

export default RoomForm;
