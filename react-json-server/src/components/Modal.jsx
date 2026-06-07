function Modal({ titulo, onFechar, children }) {
  return (
    <div className="modal-overlay" onClick={onFechar}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <div className="modal-cabecalho">
          <h2>{titulo}</h2>
          <button
            type="button"
            className="modal-fechar"
            onClick={onFechar}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
