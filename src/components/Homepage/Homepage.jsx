import { Link } from "react-router-dom";
import "./Homepage.css";

function Homepage() {
  return (
    <section className="homepage">
      <p>Jake's Casino</p>
      <Link to="/game">
        <button className="homepage__btn">Play!</button>
      </Link>
    </section>
  );
}

export default Homepage;
