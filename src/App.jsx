import { useState } from 'react'
import './App.css'

let pessoas = []

function App() {
  const [titulo, setTitulo] = useState("")
  const [desc, setDesc] = useState("")
  const [dias, setDias] = useState([])
  const [materia, setMateria] = useState("")
  const [tarefas, setTarefas] = useState([])

  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
  const materias = ["Matemática", "História", "Física", "Português", "Química", "Geografia", "Biologia", "Filosofia", ]

  const handleClick = () => {
    if (!titulo || !desc || dias.length === 0 || materia === "") {
      alert("Preencha todos os campos!")
      return
    }

    const novaTarefa = {
      id: tarefas.length,
      titulo,
      desc,
      dias,
      materia,
      concluida: false
    }

    setTarefas([...tarefas, novaTarefa])
    setTitulo("")
    setDesc("")
    setDias([])
    setMateria("")
  }

  const handleCheckDia = (dia) => {
    if (dias.includes(dia)) {
      setDias(dias.filter(d => d !== dia))
    } else {
      setDias([...dias, dia])
    }
  }

  const toggleConcluir = (id) => {
    const novas = tarefas.map(tarefa => 
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    )
    setTarefas(novas)
  }

  const removerTarefa = (id) => {
    const novas = tarefas.filter(tarefa => tarefa.id !== id)
    setTarefas(novas)
  }

  return (
    <>
    <div className="container">
      <div className="card">
        <input className='titulo'
          type="text"
          placeholder='Digite o título...'
          onChange={e => setTitulo(e.target.value)}
          value={titulo}
        />
        <input className='desc'
          type="text"
          placeholder='Digite a descrição...'
          onChange={e => setDesc(e.target.value)}
          value={desc}
        />

        <div>
          <p>Escolha os dias:</p>
          {diasSemana.map((dia) => (
            <label key={dia}>
              <input
                type="checkbox"
                onChange={() => handleCheckDia(dia)}
                checked={dias.includes(dia)}
              />
              {dia}
            </label>
          ))}
        </div>

        <div>
          <p>Escolha a matéria:</p>
          <select value={materia} onChange={e => setMateria(e.target.value)}>
            <option value="">Selecione...</option>
            {materias.map(mat => (
              <option key={mat} value={mat}>{mat}</option>
            ))}
          </select>
        </div>

        <button onClick={handleClick}>Adicionar tarefa</button>

        <hr />

        <h2>Lista de Tarefas</h2>
        {tarefas.map(tarefa => (
          <div key={tarefa.id} style={{ marginBottom: "10px", backgroundColor: "#eee", padding: "10px" }}>
            <p><strong>Título:</strong> {tarefa.titulo}</p>
            <p><strong>Descrição:</strong> {tarefa.desc}</p>
            <p><strong>Matéria:</strong> {tarefa.materia}</p>
            <p><strong>Dias:</strong> {tarefa.dias.join(", ")}</p>
            <p><strong>Status:</strong> {tarefa.concluida ? "Concluída" : "Pendente"}</p>
            <button onClick={() => toggleConcluir(tarefa.id)}>
              {tarefa.concluida ? "Desmarcar" : "Concluir"}
            </button>
            <button onClick={() => removerTarefa(tarefa.id)}>Remover</button>
          </div>
        ))}
      </div>
      </div>
    </>
  )
}

export default App
