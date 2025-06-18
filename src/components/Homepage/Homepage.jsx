import { Link } from "react-router-dom";
import "./Homepage.css";
import logo from "../../assets/jakecasinologo.png";
import play from "../../assets/jakecasinoplay.png";

function Homepage() {
  return (
    <section className="homepage">
      <img className="homepage__logo" src={logo} alt="logo" />
      <Link to="/game">
        <button className="homepage__btn">
          <img src={play} alt="play" />
        </button>
      </Link>
      <Link to="/user">
        <button>User</button>
      </Link>
    </section>
  );
}

export default Homepage;
