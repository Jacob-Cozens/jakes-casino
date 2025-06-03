import "./Main.css";
import GameWindow from "../GameWindow/GameWindow";

function Main({ getDeck, drawCards }) {
  return (
    <main className="main">
      <p className="main__text">
        Hello, and welcome to Jake's Casino! Feel free to play a few rounds of
        BlackJack by pressing the button below.
      </p>
      <GameWindow />
      <button type="button" onClick={getDeck} className="main__button">
        Play!
      </button>
    </main>
  );
}

export default Main;
