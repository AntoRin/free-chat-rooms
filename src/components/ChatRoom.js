import { useEffect, useState, useRef } from "react";
import { Redirect, useHistory } from "react-router-dom";
import io from "socket.io-client";
import "../chat-room.css";
import NameModal from "./NameModal";
import CurrentOnlineUsers from "./CurrentOnlineUsers";
import RoomHeader from "./RoomHeader";
import NavBar from "./NavBar";
import MessageCard from "./MessageCard";

let socket;

function ChatRoom({ match, setActiveRoom }) {
  const typeBox = useRef();
  const chatMessages = useRef();
  const [user, setUser] = useState(
    localStorage.getItem("chat_room_username") || ""
  );
  const [chatText, setChatText] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [roomDetails, setRoomDetails] = useState(false);

  const history = useHistory();

  useEffect(() => {
    socket = io();
    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    let activeChatUrl = history.location.pathname;
    setActiveRoom(activeChatUrl);
  }, []);

  useEffect(async () => {
    async function acceptUser() {
      let auth = await fetch("/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roomId: match.params.roomId }),
      });
      let roomStatus = await auth.json();
      //   console.log(roomStatus);
      if (roomStatus.status === "error") return setIsVerified(false);

      if (user === "") {
        return;
      } else {
        if (!localStorage.getItem("chat_room_username")) {
          localStorage.setItem("chat_room_username", user);
        }
      }
      let isPublic = roomStatus.password ? false : true;
      let userDetails = {
        name: user,
        room:
          roomStatus.roomName +
          (roomStatus.password ? roomStatus.password + "vldGxlND14WNzZXJ" : ""),
        isPublic,
      };
      socket.emit("room", userDetails);

      socket.on("info", info => {
        if (chatMessages.current) {
          chatMessages.current.innerHTML += `<div class="chat-font"><div><strong>Bot</strong></div><div><i>${info}</i></div></div>`;
          chatMessages.current.scrollTop = chatMessages.current.scrollHeight;
        }
      });

      socket.on("message", msg => {
        if (chatMessages.current) {
          chatMessages.current.innerHTML += `<div class="chat-font"><div><strong>${msg.user}</strong></div><div>${msg.chatText}</div></div>`;
          chatMessages.current.scrollTop = chatMessages.current.scrollHeight;
        }
      });

      socket.on("allConnectedUsers", allUsers => {
        setAllUsers(allUsers);
      });
    }

    await acceptUser();
  }, [user]);

  function sendMessage(event) {
    event.preventDefault();
    let chat = {
      user,
      chatText,
    };
    socket.emit("chat", chat);
    setChatText("");
    typeBox.current.focus();
  }

  function handleChange(event) {
    setChatText(event.target.value);
  }

  return isVerified ? (
    <div className="chat-room">
      <NavBar
        openRoomDetails={setRoomDetails}
        username={user}
        setUser={setUser}
      />
      {user === "" && <NameModal setUser={setUser} label="Name:" />}
      <div className="chat-window">
        <div className="chat">
          <RoomHeader room={match.params.room} />
          <div ref={chatMessages} className="chat-messages"></div>
          <div className="chat-input">
            <form onSubmit={sendMessage}>
              {/* <h3 id="user">{user}</h3> */}
              <input
                ref={typeBox}
                type="text"
                required
                autoComplete="off"
                autoFocus="on"
                name="chatText"
                id="chatText"
                value={chatText}
                onChange={handleChange}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
      {roomDetails && (
        <div className="connected-users">
          <CurrentOnlineUsers allUsers={allUsers} />
        </div>
      )}
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default ChatRoom;
