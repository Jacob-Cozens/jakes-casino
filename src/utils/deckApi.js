function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  Promise.reject(`Error: ${res.status}`);
}

export const getDeck = () => {
  return fetch(
    `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => {
    return processResponse(res);
  });
};

export const drawCards = (deckId) => {
  return fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  ).then(processResponse);
};

export const drawDealerCards = (deckId) => {
  return fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  ).then(processResponse);
};
