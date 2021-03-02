function CurrentOnlineUsers({allUsers}) {
  const users = allUsers.map((user, index) => (
    <div key={index}>{user.name}</div>
  ));

  return (
    <>
      <div className="users-list">
        <header>
          <h4>Online</h4>
        </header>
        <div>{users}</div>
      </div>
      <div className="room-type">
        {allUsers[0].public ? <h4>Public</h4> : <h4>Private</h4>}
      </div>
    </>
  );
}

export default CurrentOnlineUsers;
