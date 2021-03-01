import { useState } from "react";
import "../name-modal.css";

function NameModal({ setUser, label, changeName, setSettings }) {
  const [currentName, setCurrentName] = useState("");

  function handleChange(event) {
    setCurrentName(event.target.value);
  }

  function close(event) {
    if (currentName.trim() !== "") {
      event.preventDefault();
      if (changeName) {
        localStorage.setItem("chat_room_username", currentName);
        setSettings(false);
        return window.location.reload();
      }
      setUser(currentName);
    }
  }
  return (
    <div className="Modal">
      <div className="modal">
        <div className="name-input">
          <form>
            <label htmlFor="modal-username">{label}</label>
            <input
              type="text"
              value={currentName}
              onChange={handleChange}
              autoComplete="off"
              required
              pattern="[A-Za-z]"
              title="Anything but nothing"
              name="modal-username"
              id="modal-username"
              autoFocus="on"
              placeholder="What would you like to be called?"
            />
            <button type="submit" onClick={close}>
              Go!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NameModal;
