import { useState, useEffect, act } from "react";

import Main from "../Main/Main";
import Header from "../Header/Header";
import { getDeck, drawCards } from "../../utils/deckApi";
import "./App.css";

function App() {
  const handleGetDeck = () => {
    getDeck().then((data) => {
      console.log("Deck fetched on mount", data);
    });
  };

  const handleDrawCards = () => {
    drawCards().then((data) => {
      console.log("Cards have been drawn", data);
    });
  };

  useEffect(() => {
    drawCards();
  }, []);

  useEffect(() => {
    getDeck();
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main getDeck={handleGetDeck} drawCards={handleDrawCards} />
      </div>
    </div>
  );
}

export default App;
