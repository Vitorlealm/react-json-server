import { useEffect, useState } from "react";
import TarefaForm from "./components/TarefaForm";
import TarefaList from "./components/TarefaList";
import "./App.css";

const API_URL = "http://localhost:3000/tarefas";

function App() {
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((dados) => setTarefas(dados));
  }, []);

  async function adicionarTarefa(novaTarefa) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...novaTarefa, concluida: false }),
    });
    const criada = await res.json();
    setTarefas([...tarefas, criada]);
  }

  async function atualizarTarefa(id, dados) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    const atualizada = await res.json();
    setTarefas(tarefas.map((t) => (t.id === id ? atualizada : t)));
  }

  function alternarStatus(tarefa) {
    atualizarTarefa(tarefa.id, { concluida: !tarefa.concluida });
  }

  async function removerTarefa(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTarefas(tarefas.filter((t) => t.id !== id));
  }

  return (
    <main className="app">
      <h1>Cadastro de Tarefas (to-do list)</h1>

      <TarefaForm onEnviar={adicionarTarefa} />

      <h2>Minhas tarefas ({tarefas.length})</h2>

      <TarefaList
        tarefas={tarefas}
        onAtualizar={atualizarTarefa}
        onAlternarStatus={alternarStatus}
        onRemover={removerTarefa}
      />
    </main>
  );
}

export default App;
