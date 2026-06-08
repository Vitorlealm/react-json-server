import { useState } from "react";
import Modal from "./Modal";
import TarefaForm from "./TarefaForm";

const CLASSE_PRIORIDADE = { Alta: "alta", Média: "media", Baixa: "baixa" };

function formatarPrazo(prazo) {
  if (!prazo) return "Sem prazo";
  return new Date(prazo + "T00:00:00").toLocaleDateString("pt-BR");
}

function TarefaList({ tarefas, onAtualizar, onAlternarStatus, onRemover }) {
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [tarefaExcluindo, setTarefaExcluindo] = useState(null);

  if (tarefas.length === 0) {
    return <p>Nenhuma tarefa cadastrada ainda.</p>;
  }

  return (
    <>
      {tarefas.map((tarefa) => (
        <div
          key={tarefa.id}
          className={tarefa.concluida ? "card concluida" : "card"}
        >
          <h3>{tarefa.titulo}</h3>
          {tarefa.descricao && <p>{tarefa.descricao}</p>}
          <span
            className={
              "prioridade prioridade-" + CLASSE_PRIORIDADE[tarefa.prioridade]
            }
          >
            {tarefa.prioridade}
          </span>
          <p>Prazo: {formatarPrazo(tarefa.prazo)}</p>
          <p>Status: {tarefa.concluida ? "Concluída" : "Pendente"}</p>

          <div className="acoes">
            <button onClick={() => onAlternarStatus(tarefa)}>
              {tarefa.concluida ? "Reabrir" : "Concluir"}
            </button>
            <button onClick={() => setTarefaEditando(tarefa)}>Editar</button>
            <button
              className="perigo"
              onClick={() => setTarefaExcluindo(tarefa)}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}

      {tarefaEditando && (
        <Modal titulo="Editar tarefa">
          <TarefaForm
            tarefaInicial={tarefaEditando}
            textoBotao="Salvar alterações"
            onEnviar={(dados) => {
              onAtualizar(tarefaEditando.id, dados);
              setTarefaEditando(null);
            }}
            onCancelar={() => setTarefaEditando(null)}
          />
        </Modal>
      )}

      {tarefaExcluindo && (
        <Modal titulo="Excluir tarefa">
          <p>Tem certeza que deseja excluir {tarefaExcluindo.titulo}?</p>
          <div className="acoes">
            <button
              className="perigo"
              onClick={() => {
                onRemover(tarefaExcluindo.id);
                setTarefaExcluindo(null);
              }}
            >
              Excluir
            </button>
            <button onClick={() => setTarefaExcluindo(null)}>Cancelar</button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default TarefaList;
