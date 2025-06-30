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
  const [isHandComplete, setIsHandComplete] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showCards, setShowCards] = useState(false);
  const [winner, setWinner] = useState("");
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const [tieCount, setTieCount] = useState(0);
  const [cardValue, setCardValue] = useState(0);

  const cardObj = {
    JACK: 10,
    QUEEN: 10,
    KING: 10,
    ACE: 11,
  };

  const cardMap = new Map(Object.entries(cardObj));

  const handleResetHand = () => {
    if (isHandComplete) {
      setIsHandComplete(false);
      setWinner("");
      setIsPlayerBusted(false);
      setIsDealerBusted(false);
      setIsDealersTurn(false);
      setPlayerCount(0);
      setDealerCount(0);
      setIsBlackJack(false);
      setDrawnCards([]);
      setDrawnDealerCards([]);
      setShowCards(false);
      setShowButton(true);
    }
  };

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
      if (sum > 21 && card.value === 11) {
        setPlayerCount(sum - 10);
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
    if (!isHandComplete) {
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
        if (playerCount === 21) {
          handleStay();
        }
      });
    }
  };

  const handleDealerHit = () => {
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
  }, [dealerCount]);

  useEffect(() => {
    if (
      isDealersTurn &&
      dealerCount < 17 &&
      !isPlayerBusted &&
      winner != "player"
    ) {
      setTimeout(() => {
        handleDealerHit();
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

  useEffect(() => {
    if (winner === "player") {
      setWinCount(winCount + 1);
    }
    if (winner === "dealer") {
      setLossCount(lossCount + 1);
    }
    if (winner === "push") {
      setTieCount(tieCount + 1);
    }
  }, [winner]);

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
                  winCount={winCount}
                  lossCount={lossCount}
                  tieCount={tieCount}
                  resetHand={handleResetHand}
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
