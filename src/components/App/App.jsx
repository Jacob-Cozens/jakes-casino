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
      if (sum === 21 && dealerCount !== 21) {
        setIsBlackJack(true);
        setWinner("player");
        setIsHandComplete(true);
      }
      if (sum === 21 && dealerCount === 21) {
        setWinner("push");
        setIsHandComplete(true);
      }
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
      if (sum === 21 && playerCount !== 21) {
        setIsBlackJack(true);
        setWinner("dealer");
        setIsHandComplete(true);
      }
      if (sum === 21 && playerCount === 21) {
        setWinner("push");
        setIsHandComplete(true);
      }
    });
  };

  const handleHitMe = () => {
    hitMe(deckId).then((data) => {
      const sum = +data?.cards.map((card) => {
        if (cardMap.has(card.value)) {
          return cardMap.get(card.value);
        }
        return Number(card.value);
      });
      const newSum = sum + playerCount;
      setHitCard(data?.cards);
      setPlayerCount(newSum);
    });
  };

  const dealerHit = () => {
    hitMe(deckId).then((data) => {
      const sum = +data?.cards.map((card) => {
        if (cardMap.has(card.value)) {
          return cardMap.get(card.value);
        }
        return Number(card.value);
      });
      const newSum = sum + dealerCount;
      setHitCard(data?.cards);
      setDealerCount(newSum);
    });
  };

  const handleStay = () => {
    if (!isPlayerBusted && !isDealersTurn) {
      setIsDealersTurn(true);
    }
  };

  const handleDrawCards = () => {
    handleDrawnCards();
    handleDrawnDealerCards();
    setShowButton(false);
    setShowCards(true);
  };

  useEffect(() => {
    getDeck().then((data) => {
      console.log("Deck fetch has been mounted", data);
      setDeckId(data.deck_id);
    });
  }, []);

  useEffect(() => {
    if (playerCount > 21) {
      setWinner("dealer");
      setIsPlayerBusted(true);
      setIsHandComplete(true);
    }
  }, [playerCount]);

  useEffect(() => {
    if (dealerCount > 21) {
      setWinner("player");
      setIsDealerBusted(true);
      setIsHandComplete(true);
    }
  });

  useEffect(() => {
    if (
      isDealersTurn &&
      dealerCount < 17 &&
      !isPlayerBusted &&
      winner != "player"
    ) {
      setTimeout(() => {
        dealerHit();
      }, 500);
    }
    if (
      isDealersTurn &&
      dealerCount >= 17 &&
      dealerCount <= 21 &&
      !isPlayerBusted
    ) {
      if (dealerCount > playerCount) {
        setWinner("dealer");
        setIsHandComplete(true);
      }
      if (dealerCount < playerCount) {
        setWinner("player");
        setIsHandComplete(true);
      }
      if (dealerCount === playerCount) {
        setWinner("push");
        setIsHandComplete(true);
      }
    }
  });

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
                  stay={handleStay}
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
