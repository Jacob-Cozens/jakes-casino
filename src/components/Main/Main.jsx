import { useState } from "react";
import { Link } from "react-router-dom";
import CardSection from "../CardSection/CardSection";
import "./Main.css";

function Main({ drawCards, hitMe, showButton, drawnCards, showCards }) {
  const buttonClassName = showButton ? "main__btn" : "main__btn-hidden";
  const buttonClassNameHit = showButton ? "main__btn-hidden" : "main__btn";
  

  // const showCards = () => {
  //   drawnCards?.map((card) => {
  //     return <img src={card.image} alt="" height={250} width={250} />;
  //   });
  // };

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
      <CardSection showCards={showCards} drawnCards={drawnCards} />
      <button type="button" onClick={drawCards} className={buttonClassName}>
        Draw Cards
      </button>
      <button type="button" onClick={showCards} className={buttonClassNameHit}>
        Show Cards
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
