import { Link } from "react-router-dom";
import "./Homepage.css";
import logo from "../../assets/jakecasinologo.png";

function Homepage() {
  return (
    <section className="homepage">
      <img className="homepage__logo" src={logo} alt="logo" />
      <Link to="/game">
        <button className="homepage__btn">Play!</button>
      </Link>
    </section>
  );
}

export default Homepage;
