import { useState } from "react";

function TarefaForm({
  onEnviar,
  tarefaInicial,
  textoBotao = "Adicionar tarefa",
  onCancelar,
}) {
  const editando = Boolean(tarefaInicial);

  const [titulo, setTitulo] = useState(tarefaInicial?.titulo ?? "");
  const [descricao, setDescricao] = useState(tarefaInicial?.descricao ?? "");
  const [prioridade, setPrioridade] = useState(tarefaInicial?.prioridade ?? "Média");
  const [prazo, setPrazo] = useState(tarefaInicial?.prazo ?? "");

  function handleSubmit(evento) {
    evento.preventDefault();
    if (!titulo.trim()) return;

    onEnviar({ titulo, descricao, prioridade, prazo });

    if (!editando) {
      setTitulo("");
      setDescricao("");
      setPrioridade("Média");
      setPrazo("");
    }
  }

  return (
    <form className="tarefa-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <select value={prioridade} onChange={(e) => setPrioridade(e.target.value)}>
        <option value="Baixa">Baixa</option>
        <option value="Média">Média</option>
        <option value="Alta">Alta</option>
      </select>

      <input
        type="date"
        value={prazo}
        onChange={(e) => setPrazo(e.target.value)}
      />

      <div className="acoes">
        <button type="submit" className="primario">
          {textoBotao}
        </button>
        {onCancelar && (
          <button type="button" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default TarefaForm;
