import "./CardSection.css";

function CardSection({ drawnCards, showCards }) {
  return (
    <div className="card-section">
      <div className="card-section__modal">User Cards</div>
      <div className="card-section__modal">Dealer Cards</div>
      {showCards &&
        drawnCards?.map((card) => {
          return <img src={card.image} alt="" height={250} width={250} />;
        })}
    </div>
  );
}

export default CardSection;
