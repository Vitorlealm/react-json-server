function Modal({ titulo, children }) {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>{titulo}</h2>
        {children}
      </div>
    </div>
  );
}

export default Modal;
