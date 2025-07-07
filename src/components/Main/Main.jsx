import { useState } from "react";
import { Link } from "react-router-dom";
import CardSection from "../CardSection/CardSection";
import "./Main.css";

import back from "../../assets/jakes-casino-back.png";
import user from "../../assets/jakes-casino-profile.png";

function Main({
  drawCards,
  hitMe,
  hitCard,
  dealerHitCard,
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
  isDealersTurn,
  hiddenDealerCount,
  selectedCard,
  isHandComplete,
}) {
  const buttonClassName = showButton ? "main__btn" : "main__btn-hidden";
  const buttonClassNameHit = showButton ? "main__btn-hidden" : "main__btn";
  const buttonClassNameReset = isHandComplete
    ? "main__btn"
    : "main__btn-hidden";
  const hideDealerCount = isDealersTurn ? dealerCount : hiddenDealerCount;

  return (
    <main className="main">
      <p className="main__text">
        Hello, and welcome to Jake's Casino! Feel free to play a few rounds of
        BlackJack by pressing the button below.
      </p>
      <Link to="/">
        <button className="main__btn-home">
          <img src={back} />
        </button>
      </Link>
      <Link to="/user">
        <button className="main__btn-user">
          <img src={user} />
        </button>
      </Link>
      <div className="main__caption">
        <p className="main__caption-user">
          User Score: {playerCount} User Wins: {winCount}
        </p>
        <p className="main__caption">Tie Count: {tieCount}</p>
        <p className="main__caption-dealer">
          Dealer Score: {hideDealerCount} Dealer Wins: {lossCount}
        </p>
      </div>
      <CardSection
        showCards={showCards}
        drawnCards={drawnCards}
        drawnDealerCards={drawnDealerCards}
        hitCard={hitCard}
        dealerHitCard={dealerHitCard}
        selectedCard={selectedCard}
        isDealersTurn={isDealersTurn}
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
      <button
        type="button"
        onClick={resetHand}
        className={buttonClassNameReset}
      >
        Run it back!
      </button>
    </main>
  );
}

export default Main;
