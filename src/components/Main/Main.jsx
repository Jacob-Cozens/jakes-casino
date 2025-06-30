import { useState } from "react";
import { Link } from "react-router-dom";
import CardSection from "../CardSection/CardSection";
import "./Main.css";

function Main({
  drawCards,
  hitMe,
  hitCard,
  stay,
  showButton,
  drawnCards,
  playerCount,
  drawnDealerCards,
  dealerCount,
  showCards,
  winCount,
  lossCount,
  tieCount,
  resetHand,
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
      <button type="button" onClick={resetHand} className="main__btn-user">
        Reset
      </button>
      <div className="main__caption">
        <p className="main__caption-user">
          User Score: {playerCount} User Wins: {winCount}
        </p>
        <p className="main__caption">Tie Count: {tieCount}</p>
        <p className="main__caption-dealer">
          Dealer Score: {dealerCount} Dealer Wins: {lossCount}
        </p>
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
      <button type="button" onClick={stay} className={buttonClassNameHit}>
        Stay...
      </button>
    </main>
  );
}

export default Main;
