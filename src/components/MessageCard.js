function MessageCard({ user, message }) {
  console.log(user);
  console.log(message);
  return (
    <div>
      <strong>{user}</strong>
      {message}
    </div>
  );
}

export default MessageCard;
