import { useNavigate } from "react-router-dom";
import "./UserPage.css";
import back from "../../assets/jakes-casino-back.png";
import LoginModal from "../LoginModal/LoginModal";

function UserPage({ isOpen, closeModal, openModal }) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="user-page">
      <button onClick={handleGoBack} className="user-page__back" type="button">
        <img src={back} />
      </button>
      <button onClick={openModal} className="user-page__login">
        No account? Make one!
      </button>
      <LoginModal isOpen={isOpen} title="Login" closeModal={closeModal} />
    </div>
  );
}

export default UserPage;
