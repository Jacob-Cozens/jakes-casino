import { Link } from "react-router-dom";
import UserCards from "../CardSection/CardSection";
import "./Main.css";

function Main({ drawCards, hitMe, showButton }) {
  const buttonClassName = showButton ? "main__btn" : "main__btn-hidden";
  const buttonClassNameHit = showButton ? "main__btn-hidden" : "main__btn";

  return (
    <main className="main">
      <p className="main__text">
        Hello, and welcome to Jake's Casino! Feel free to play a few rounds of
        BlackJack by pressing the button below.
      </p>
      <Link to="/">
        <button className="main__btn-home">Home</button>
      </Link>
      <UserCards />
      <button type="button" onClick={drawCards} className={buttonClassName}>
        Draw Cards
      </button>
      <button type="button" onClick={hitMe} className={buttonClassNameHit}>
        Hit Me!
      </button>
      <button type="button" className={buttonClassNameHit}>
        Stay...
      </button>
    </main>
  );
}

export default Main;
