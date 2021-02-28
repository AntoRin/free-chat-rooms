function MessageCard({ messages }) {
  const card = messages.map((message) => (
    <div key={message.message}>
      <strong>{message.name}</strong>
      {message.message}
    </div>
  ));

  return card;
}

export default MessageCard;
