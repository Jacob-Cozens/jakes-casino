import "./CardSection.css";

function UserCards({ showCards }) {
  return (
    <div className="card-section">
      <div className="card-section__modal">User Cards</div>
      <div className="card-section__modal">Dealer Cards</div>
    </div>
  );
}

export default UserCards;
