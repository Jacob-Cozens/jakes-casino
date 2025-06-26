import { useState, useEffect, act } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Homepage from "../Homepage/Homepage";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import UserPage from "../UserPage/UserPage";
import {
  getDeck,
  drawCards,
  drawDealerCards,
  hitMe,
} from "../../utils/deckApi";
import "./App.css";

function App() {
  const [deckId, setDeckId] = useState([]);
  const [drawnCards, setDrawnCards] = useState([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [drawnDealerCards, setDrawnDealerCards] = useState([]);
  const [dealerCount, setDealerCount] = useState(0);
  const [hitCard, setHitCard] = useState([]);
  const [isBlackJack, setIsBlackJack] = useState(false);
  const [isPlayerBusted, setIsPlayerBusted] = useState(false);
  const [isDealersTurn, setIsDealersTurn] = useState(false);
  const [isDealerBusted, setIsDealerBusted] = useState(false);
  const [isHandComplete, setIsHandComplete] = useState(true);
  const [showButton, setShowButton] = useState(true);
  const [showCards, setShowCards] = useState(false);
  const [winner, setWinner] = useState("");

  const cardObj = {
    JACK: 10,
    QUEEN: 10,
    KING: 10,
    ACE: 11,
  };

  const cardMap = new Map(Object.entries(cardObj));

  const handleDrawnCards = () => {
    drawCards(deckId).then((data) => {
      const sum = data?.cards.reduce((acc, card) => {
        if (cardMap.has(card.value)) {
          return acc + cardMap.get(card.value);
        }
        return acc + Number(card.value);
      }, 0);
      setDrawnCards(data?.cards);
      setPlayerCount(sum);
    });
  };

  const handleDrawnDealerCards = () => {
    drawCards(deckId).then((data) => {
      const sum = data?.cards.reduce((acc, card) => {
        if (cardMap.has(card.value)) {
          return acc + cardMap.get(card.value);
        }
        return acc + Number(card.value);
      }, 0);
      setDrawnDealerCards(data?.cards);
      setDealerCount(sum);
    });
  };

  const handleDrawCards = () => {
    handleDrawnCards();
    handleDrawnDealerCards();
    setShowButton(false);
    setShowCards(true);
  };

  const handleHitMe = () => {
    hitMe(deckId).then((data) => {
      const newSum = data?.cards.reduce((acc, card) => {
        if (cardMap.has(card.value)) {
          return acc + cardMap.get(card.value);
        }
        return acc + Number(card.value);
      });
      setHitCard(data?.cards);
      setPlayerCount(newSum);
    });
  };

  useEffect(() => {
    getDeck().then((data) => {
      console.log("Deck fetch has been mounted", data);
      setDeckId(data.deck_id);
    });
  }, []);

  return (
    <BrowserRouter>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="user" element={<UserPage />} />
            <Route
              path="game"
              element={
                <Main
                  drawCards={handleDrawCards}
                  drawnCards={drawnCards}
                  playerCount={playerCount}
                  drawnDealerCards={drawnDealerCards}
                  dealerCount={dealerCount}
                  deckId={deckId}
                  showButton={showButton}
                  showCards={showCards}
                  hitMe={handleHitMe}
                  hitCard={hitCard}
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
