import { useState, useEffect, act } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "../Homepage/Homepage";
import Main from "../Main/Main";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {
  getDeck,
  drawCards,
  drawDealerCards,
  hitMe,
} from "../../utils/deckApi";
import "./App.css";

function App() {
  const [deckId, setDeckId] = useState([]);
  const [cardImage, setCardImage] = useState([]);
  const [showButton, setShowButton] = useState(true);

  const handleDrawCards = () => {
    drawCards(deckId).then((data) => {
      console.log("Cards have been drawn", data);
    });
    drawDealerCards(deckId).then((data) => {
      console.log("Dealer cards have been drawn", data);
    });
    setShowButton(false);
  };

  const handleHitMe = () => {
    hitMe(deckId).then((data) => {
      console.log("You've hit!", data);
    });
  };

  useEffect(() => {
    getDeck().then((data) => {
      console.log("Deck fetch has been mounted", data);
      setDeckId(data.deck_id);
      setCardImage(data.image);
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
              element={
                <Main
                  drawCards={handleDrawCards}
                  deckId={deckId}
                  showButton={showButton}
                  hitMe={handleHitMe}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
