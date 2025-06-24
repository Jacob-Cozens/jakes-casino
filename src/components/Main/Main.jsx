import { useState } from "react";
import { Link } from "react-router-dom";
import CardSection from "../CardSection/CardSection";
import "./Main.css";

function Main({
  drawCards,
  hitMe,
  hitCard,
  showButton,
  drawnCards,
  playerCount,
  setPlayerCount,
  drawnDealerCards,
  dealerCount,
  showCards,
}) {
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
      <Link to="/user">
        <button className="main__btn-user">User</button>
      </Link>
      <div className="main__caption">
        <p className="main__caption-user">{playerCount}</p>
        <p className="main__caption-dealer">{dealerCount}</p>
      </div>
      <CardSection
        showCards={showCards}
        drawnCards={drawnCards}
        drawnDealerCards={drawnDealerCards}
        hitCard={hitCard}
      />
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
