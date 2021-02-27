import { useState } from "react";
import "../name-modal.css";

function NameModal({ setUser }) {
  const [currentName, setCurrentName] = useState("");

  function handleChange(event) {
    setCurrentName(event.target.value);
  }

  function close() {
    setUser(currentName);
  }
  return (
    <div className="Modal">
      <div className="modal">
        <div className="name-input">
          <form>
            <label htmlFor="modal-username">Name:</label>
            <input
              type="text"
              value={currentName}
              onChange={handleChange}
              autoComplete="off"
              required
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
