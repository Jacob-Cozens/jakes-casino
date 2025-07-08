import "./LoginModal.css";

function LoginModal({ closeModal, isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">Make an account! (Or Login)</h2>
        <button onClick={closeModal} className="modal__close">
          Close
        </button>
        <form className="modal__form">
          <label className="modal__label">
            Username
            <input
              type="text"
              className="modal__input"
              placeholder="Username"
              required
            />
          </label>
          <label className="modal__label">
            Password{" "}
            <input
              type="password"
              className="modal__input"
              placeholder="Password"
              required
            />
          </label>
        </form>
        <button className="modal__submit">Submit</button>
      </div>
    </div>
  );
}

export default LoginModal;
