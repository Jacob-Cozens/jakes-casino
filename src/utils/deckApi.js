function processResponse(res) {
  if (res.ok) {
    return res.json();
  }
  Promise.reject(`Error: ${res.status}`);
}

const deckId = getDeck(data.deck_id);

export const getDeck = ({ success, deck_id, shuffled, remaining }) => {
  return fetch(
    `https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success,
        deck_id,
        shuffled,
        remaining,
      }),
    }
  ).then((res) => {
    return processResponse(res);
  });
};

export const drawCards = () => {
  return fetch(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
  ).then(processResponse);
};
