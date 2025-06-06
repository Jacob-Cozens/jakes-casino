import { useState, useEffect, act } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "../Homepage/Homepage";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { getDeck, drawCards } from "../../utils/deckApi";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [deckId, setDeckId] = useState([]);

  const handleDrawCards = () => {
    drawCards().then((data) => {
      console.log("Cards have been drawn", data);
      setDeckId(data.deck_id);
    });
  };

  useEffect(() => {
    getDeck().then((data) => {
      console.log("Deck fetch has been mounted", data);
      setData(data);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="page">
        <div className="page__content">
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route
              path="game"
              element={<Main drawCards={handleDrawCards} deckId={deckId} />}
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
