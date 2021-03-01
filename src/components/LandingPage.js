import { useHistory } from "react-router-dom";
function LandingPage() {
  const history = useHistory();

  function redirect() {
    history.push("/chatrooms");
  }
  return (
    <div>
      <h1>Landing Page</h1>
      <button onClick={redirect}>Chat Rooms</button>
    </div>
  );
}

export default LandingPage;
