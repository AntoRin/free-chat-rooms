import { useHistory } from "react-router-dom";
import { BiMessageSquareError } from "react-icons/bi";
import "../active-chat.css";

function ActiveChat({ roomLink }) {
  const history = useHistory();

  function goToChat() {
    history.push(roomLink);
  }

  return (
    <div onClick={goToChat} className="active-chat-container">
      <BiMessageSquareError className="active-chat-icon" />
    </div>
  );
}

export default ActiveChat;
