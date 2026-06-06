const CLASSE_PRIORIDADE = {
  Alta: "alta",
  Média: "media",
  Baixa: "baixa",
};

function formatarPrazo(prazo) {
  if (!prazo) return "Sem prazo";
  return new Date(prazo + "T00:00:00").toLocaleDateString("pt-BR");
}

function TarefaList({ tarefas }) {
  if (tarefas.length === 0) {
    return <p className="lista-vazia">Nenhuma tarefa cadastrada ainda.</p>;
  }

  return (
    <ul className="tarefa-lista">
      {tarefas.map((tarefa) => (
        <li
          key={tarefa.id}
          className={`tarefa-card ${tarefa.concluida ? "concluida" : ""}`}
        >
          <div className="tarefa-cabecalho">
            <h3>{tarefa.titulo}</h3>
            <span
              className={`badge prioridade-${CLASSE_PRIORIDADE[tarefa.prioridade] ?? "media"}`}
            >
              {tarefa.prioridade}
            </span>
          </div>

          {tarefa.descricao && (
            <p className="tarefa-descricao">{tarefa.descricao}</p>
          )}

          <div className="tarefa-rodape">
            <span>prazo: {formatarPrazo(tarefa.prazo)}</span>
            <span
              className={`badge status ${tarefa.concluida ? "feita" : "pendente"}`}
            >
              {tarefa.concluida ? "Concluída" : "Pendente"}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TarefaList;
