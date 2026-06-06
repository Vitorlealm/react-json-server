import { useState } from "react";

function TarefaForm({ onAdicionar }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [prioridade, setPrioridade] = useState("Média");
  const [prazo, setPrazo] = useState("");

  function handleSubmit(evento) {
    evento.preventDefault();
    if (!titulo.trim()) return;

    onAdicionar({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      prioridade,
      prazo,
    });
    setTitulo("");
    setDescricao("");
    setPrioridade("Média");
    setPrazo("");
  }

  return (
    <form className="tarefa-form" onSubmit={handleSubmit}>
      <h2>Nova tarefa</h2>

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

      <button type="submit">Adicionar tarefa</button>
    </form>
  );
}

export default TarefaForm;
