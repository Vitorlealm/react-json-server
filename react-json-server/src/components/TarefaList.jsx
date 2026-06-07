import { useState } from "react";
import Modal from "./Modal";
import TarefaForm from "./TarefaForm";

const CLASSE_PRIORIDADE = {
  Alta: "alta",
  Média: "media",
  Baixa: "baixa",
};

function formatarPrazo(prazo) {
  if (!prazo) return "Sem prazo";
  return new Date(prazo + "T00:00:00").toLocaleDateString("pt-BR");
}

function TarefaList({ tarefas, onAtualizar, onAlternarStatus, onRemover }) {
  const [tarefaEditando, setTarefaEditando] = useState(null);
  const [tarefaExcluindo, setTarefaExcluindo] = useState(null);

  if (tarefas.length === 0) {
    return <p className="lista-vazia">Nenhuma tarefa cadastrada ainda.</p>;
  }

  return (
    <>
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

            <div className="tarefa-acoes">
              <button
                type="button"
                className="botao-acao"
                onClick={() => onAlternarStatus(tarefa)}
              >
                {tarefa.concluida ? "Reabrir" : "Marcar como concluída"}
              </button>
              <button
                type="button"
                className="botao-acao"
                onClick={() => setTarefaEditando(tarefa)}
              >
                Editar
              </button>
              <button
                type="button"
                className="botao-acao botao-perigo"
                onClick={() => setTarefaExcluindo(tarefa)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      {tarefaEditando && (
        <Modal titulo="Editar tarefa" onFechar={() => setTarefaEditando(null)}>
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
        <Modal titulo="Excluir tarefa" onFechar={() => setTarefaExcluindo(null)}>
          <p className="modal-texto">
            Tem certeza que deseja excluir «{tarefaExcluindo.titulo}»?
          </p>
          <div className="form-acoes">
            <button
              type="button"
              className="botao-perigo"
              onClick={() => {
                onRemover(tarefaExcluindo.id);
                setTarefaExcluindo(null);
              }}
            >
              Excluir
            </button>
            <button
              type="button"
              className="botao-secundario"
              onClick={() => setTarefaExcluindo(null)}
            >
              Cancelar
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default TarefaList;
