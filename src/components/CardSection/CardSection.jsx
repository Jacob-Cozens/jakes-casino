import "./CardSection.css";

function CardSection({ drawnCards, drawnDealerCards, showCards, hitCard }) {
  return (
    <div className="card-section">
      <div className="card-section__modal">
        {showCards &&
          drawnCards?.map((card) => {
            return <img src={card.image} alt="" height={250} width={250} />;
          })}
        {showCards &&
          hitCard?.map((card) => {
            return <img src={card.image} alt="" height={250} width={250} />;
          })}
      </div>
      <div className="card-section__modal">
        {showCards &&
          drawnDealerCards?.map((card) => {
            return <img src={card.image} alt="" height={250} width={250} />;
          })}
      </div>
    </div>
  );
}

export default CardSection;
