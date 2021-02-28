function CurrentOnlineUsers({ allUsers }) {
  const users = allUsers.map((user) => <div key={user._id}>{user.name}</div>);
  return (
    <>
      <h4>Online</h4>
      <div>{users}</div>
    </>
  );
}

export default CurrentOnlineUsers;
