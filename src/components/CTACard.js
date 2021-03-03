import {BsFillChatDotsFill} from "react-icons/bs";
import {BsLock} from "react-icons/bs";
import {BsHeart} from "react-icons/bs";
import "../cta-card.css";

function CTACard({clickHandler, text, iconNum}) {
  function selectIcon() {
    switch (iconNum) {
      case 1:
        return <BsFillChatDotsFill className="cta-icon" />;
      case 2:
        return <BsLock className="cta-icon" />;
      case 3:
        return <BsHeart className="cta-icon" />;
      default:
        return <BsFillChatDotsFill className="cta-icon" />;
    }
  }
  return (
    <div className="cta-card-container">
      <div onClick={clickHandler} className="cta-card">
        <div className="cta-top">{selectIcon()}</div>
        <div className="cta-bottom">{text}</div>
      </div>
    </div>
  );
}

export default CTACard;
