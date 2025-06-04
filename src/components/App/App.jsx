import { useState, useEffect, act } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "../Homepage/Homepage";
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
    <BrowserRouter>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="game"
              element={
                <Main getDeck={handleGetDeck} drawCards={handleDrawCards} />
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
