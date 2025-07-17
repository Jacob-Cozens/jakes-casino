import "./CardSection.css";
import backOfCard from "../../assets/backofcard.jpg";

function CardSection({
  drawnCards,
  drawnDealerCards,
  showCards,
  hitCard,
  dealerHitCard,
  selectedCard,
  isDealersTurn,
}) {
  const dealerCardImagesHidden = (
    <div className="card-section__card" key={selectedCard.code}>
      <img
        className="card-section__card"
        src={selectedCard.image}
        alt="cardimage"
      />
    </div>
  );
  const dealerCardImages = drawnDealerCards?.map((card) => {
    return (
      <div key={card.code}>
        <img className="card-section__card" src={card.image} alt="cardimage" />;
      </div>
    );
  });
  const playerCardImages = drawnCards?.map((card) => {
    return (
      <div className="cardsection__card-resize" key={card.code}>
        <img className="card-section__card" src={card.image} alt="cardimage" />;
      </div>
    );
  });
  const hitCardImage = hitCard?.map((card) => {
    return (
      <div key={card.code}>
        <img className="card-section__card" src={card.image} alt="cardimage" />;
      </div>
    );
  });
  const dealerHitCardImage = dealerHitCard?.map((card) => {
    return (
      <div key={card.code}>
        <img className="card-section__card" src={card.image} alt="cardimage" />;
      </div>
    );
  });

  const hideDealerCard = isDealersTurn
    ? dealerCardImages
    : dealerCardImagesHidden;

  const hideBackofCard = isDealersTurn
    ? "card-section__modal_back-hide"
    : "card-section__modal_back";

  return (
    <div className="card-section">
      <div className="card-section__modal">
        {showCards && playerCardImages}
        <div className="card-section__hit-card">
          {showCards && hitCardImage}
        </div>
      </div>
      <div className="card-section__modal">
        <div className={hideBackofCard}>
          {showCards && <img className="card-section__card" src={backOfCard} />}
        </div>
        {showCards && hideDealerCard}
        <div className="card-section__hit-card">
          {showCards && dealerHitCardImage}
        </div>
      </div>
    </div>
  );
}

export default CardSection;
