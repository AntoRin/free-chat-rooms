function CurrentOnlineUsers({ allUsers }) {
  const users = allUsers.map((user, index) => (
    <div key={index}>{user.name}</div>
  ));
  return (
    <>
      <h4>Online</h4>
      <div>{users}</div>
    </>
  );
}

export default CurrentOnlineUsers;
