import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavGlobal from "./NavGlobal";
import Button from "@material-ui/core/Button";
import ActiveChat from "./ActiveChat";
import "../all-public-rooms.css";

function AllPublicRooms({ activeRoom }) {
  const [publicRooms, setPublicRooms] = useState([]);
  const [activeChat, setActiveChat] = useState("");
  const history = useHistory();

  useEffect(() => {
    setActiveChat(activeRoom);
  }, [activeRoom]);

  useEffect(async () => {
    let publicData = await fetch("/public/rooms");
    let rooms = await publicData.json();
    if (rooms.status === "ok") setPublicRooms(rooms.publicRooms);
  }, []);

  async function handleRedirect(event) {
    let roomName;
    if (event.target.parentElement.querySelector("p")) {
      roomName = event.target.parentElement.querySelector("p").textContent;
    } else {
      roomName = event.target.parentElement.parentElement.querySelector("p")
        .textContent;
    }

    let auth = await fetch("/auth/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomName }),
    });
    let authToken = await auth.json();
    let roomId = authToken.token;
    let path = `/chatrooms/${roomName}/${roomId}`;
    history.push(path);
  }

  function renderList(publicRooms) {
    return publicRooms.map((room, index) => (
      <div key={index} className="room-card">
        <p>{room}</p>
        <Button onClick={handleRedirect} variant="contained" color="default">
          Join
        </Button>
      </div>
    ));
  }

  return publicRooms.length > 0 ? (
    <div className="room-list-wrapper">
      <NavGlobal />
      <div className="room-list-container">{renderList(publicRooms)}</div>
      {activeChat && activeChat !== "" ? (
        <ActiveChat roomLink={activeChat} />
      ) : null}
    </div>
  ) : (
    <div className="empty-list">
      <NavGlobal />
      <h1>No chat rooms yet! :(</h1>
      {activeChat && activeChat !== "" ? (
        <ActiveChat roomLink={activeChat} />
      ) : null}
    </div>
  );
}

export default AllPublicRooms;
