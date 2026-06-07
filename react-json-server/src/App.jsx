import { useEffect, useState } from "react";
import TarefaForm from "./components/TarefaForm";
import TarefaList from "./components/TarefaList";
import "./App.css";

const API_URL = "http://localhost:3000/tarefas";
const ERRO_API = "Não foi possível acessar a API Json Server.";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Não foi possível carregar as tarefas.");
        return res.json();
      })
      .then((dados) => setTarefas(dados))
      .catch((e) => {
        console.error(e);
        setErro(ERRO_API);
      })
      .finally(() => setCarregando(false));
  }, []);

  async function adicionarTarefa(novaTarefa) {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...novaTarefa, concluida: false }),
      });
      if (!res.ok) throw new Error("Não foi possível cadastrar a tarefa.");

      const criada = await res.json();
      setTarefas((anteriores) => [...anteriores, criada]);
      setErro(null);
    } catch (e) {
      console.error(e);
      setErro(ERRO_API);
    }
  }

  async function atualizarTarefa(id, dados) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      if (!res.ok) throw new Error("Não foi possível atualizar a tarefa.");

      const atualizada = await res.json();
      setTarefas((anteriores) =>
        anteriores.map((t) => (t.id === id ? atualizada : t))
      );
      setErro(null);
    } catch (e) {
      console.error(e);
      setErro(ERRO_API);
    }
  }

  function alternarStatus(tarefa) {
    return atualizarTarefa(tarefa.id, { concluida: !tarefa.concluida });
  }

  async function removerTarefa(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Não foi possível excluir a tarefa.");

      setTarefas((anteriores) => anteriores.filter((t) => t.id !== id));
      setErro(null);
    } catch (e) {
      console.error(e);
      setErro(ERRO_API);
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Cadastro de Tarefas (to-do list)</h1>
        <p>Adicione novas tarefas e acompanhe a sua lista.</p>
      </header>

      <TarefaForm onEnviar={adicionarTarefa} />

      <section className="app-lista">
        <h2>Minhas tarefas ({tarefas.length})</h2>

        {erro && <p className="erro">⚠️ {erro}</p>}

        {carregando ? (
          <p className="carregando">Carregando tarefas...</p>
        ) : (
          <TarefaList
            tarefas={tarefas}
            onAtualizar={atualizarTarefa}
            onAlternarStatus={alternarStatus}
            onRemover={removerTarefa}
          />
        )}
      </section>
    </main>
  );
}

export default App;
