import { Link } from "react-router-dom";
import "./Homepage.css";
import logo from "../../assets/jakes-casino-logo.png";
import play from "../../assets/jakes-casino-play.png";
import user from "../../assets/jakes-casino-user.png";

function Homepage() {
  return (
    <section className="homepage">
      <img className="homepage__logo" src={logo} alt="logo" />
      <Link to="/game">
        <button className="homepage__btn homepage__btn_play">
          <img src={play} alt="play" />
        </button>
      </Link>
      <Link to="/user">
        <button className="homepage__btn homepage__btn_user">
          <img src={user} alt="user" />
        </button>
      </Link>
    </section>
  );
}

export default Homepage;
