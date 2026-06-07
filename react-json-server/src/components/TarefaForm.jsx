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
  const [prioridade, setPrioridade] = useState(
    tarefaInicial?.prioridade ?? "Média"
  );
  const [prazo, setPrazo] = useState(tarefaInicial?.prazo ?? "");

  function handleSubmit(evento) {
    evento.preventDefault();
    if (!titulo.trim()) return;

    onEnviar({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      prioridade,
      prazo,
    });

    if (!editando) {
      setTitulo("");
      setDescricao("");
      setPrioridade("Média");
      setPrazo("");
    }
  }

  return (
    <form className="tarefa-form" onSubmit={handleSubmit}>
      {!editando && <h2>Nova tarefa</h2>}

      <label>
        Título
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ex.: Estudar para a prova"
          required
        />
      </label>

      <label>
        Descrição
        <textarea
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Detalhes da tarefa (opcional)"
          rows={3}
        />
      </label>

      <div className="form-linha">
        <label>
          Prioridade
          <select
            value={prioridade}
            onChange={(e) => setPrioridade(e.target.value)}
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </label>

        <label>
          Prazo
          <input
            type="date"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
          />
        </label>
      </div>

      <div className="form-acoes">
        <button type="submit">{textoBotao}</button>
        {onCancelar && (
          <button
            type="button"
            className="botao-secundario"
            onClick={onCancelar}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default TarefaForm;
