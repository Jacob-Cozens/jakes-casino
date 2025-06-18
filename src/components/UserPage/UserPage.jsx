import { useNavigate } from "react-router-dom";
import "./UserPage.css";

function UserPage() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="user-page">
      <button onClick={handleGoBack} type="button">
        Go Back
      </button>
    </div>
  );
}

export default UserPage;
