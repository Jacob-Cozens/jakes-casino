import { Link } from "react-router-dom";
import "./Main.css";
import GameWindow from "../GameWindow/GameWindow";

function Main({ drawCards, showButton }) {
  const buttonClassName = showButton ? "main__btn" : "main__btn-hidden";

  return (
    <main className="main">
      <p className="main__text">
        Hello, and welcome to Jake's Casino! Feel free to play a few rounds of
        BlackJack by pressing the button below.
      </p>
      <GameWindow />
      <button type="button" onClick={drawCards} className={buttonClassName}>
        Draw Cards
      </button>
      <Link to="/">
        <button className="main__btn-home">Home</button>
      </Link>
    </main>
  );
}

export default Main;
