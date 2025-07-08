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
    <img src={selectedCard.image} alt="cardimage" height={250} width={250} />
  );
  const dealerCardImages = drawnDealerCards?.map((card) => {
    return <img src={card.image} alt="cardimage" height={250} width={250} />;
  });
  const playerCardImages = drawnCards?.map((card) => {
    return <img src={card.image} alt="" height={250} width={250} />;
  });
  const hitCardImage = hitCard?.map((card) => {
    return <img src={card.image} alt="" height={250} width={250} />;
  });
  const dealerHitCardImage = dealerHitCard?.map((card) => {
    return <img src={card.image} alt="" height={250} width={250} />;
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
          {showCards && <img src={backOfCard} height={250} width={250} />}
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
