function PublicRoomsForm() {
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

export default PublicRoomsForm;
