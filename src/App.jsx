import { useState } from 'react'
import './App.css'

function App() {
  const [titulo, setTitulo] = useState("")
  const [desc, setDesc] = useState("")
  const [dias, setDias] = useState([])
  const [materia, setMateria] = useState("")
  const [tarefas, setTarefas] = useState([])

  const [mostrarFiltro, setMostrarFiltro] = useState(false)
  const [materiaFiltro, setMateriaFiltro] = useState("")
  const [diaFiltro, setDiaFiltro] = useState("")
  const [tarefasFiltradas, setTarefasFiltradas] = useState([])

  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
  const materias = ["Matemática", "História", "Física", "Português", "Química", "Geografia", "Biologia", "Filosofia"]

  const handleClick = () => {
    if (!titulo || !desc || dias.length === 0 || materia === "") {
      alert("Preencha todos os campos!")
      return
    }

    const novaTarefa = {
      id: Date.now(),
      titulo,
      desc,
      dias,
      materia,
      concluida: false
    }

    setTarefas(prev => [...prev, novaTarefa])
    setTitulo("")
    setDesc("")
    setDias([])
    setMateria("")
    setMostrarFiltro(false)
    setTarefasFiltradas([])
    setMateriaFiltro("")
    setDiaFiltro("")
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
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
    setTarefasFiltradas(tarefasFiltradas.filter(tarefa => tarefa.id !== id))
  }

  const abrirFiltro = () => {
    setMostrarFiltro(true)
    setTarefasFiltradas([])
    setMateriaFiltro("")
    setDiaFiltro("")
  }

  const aplicarFiltro = () => {
    if (materiaFiltro === "" && diaFiltro === "") {
      alert("Escolha pelo menos um filtro!")
      return
    }
    const filtradas = tarefas.filter(tarefa => {
      const matchMateria = materiaFiltro ? tarefa.materia === materiaFiltro : true
      const matchDia = diaFiltro ? tarefa.dias.includes(diaFiltro) : true
      return matchMateria && matchDia
    })
    setTarefasFiltradas(filtradas)
    setMostrarFiltro(false)
  }

  const limparFiltro = () => {
    setTarefasFiltradas([])
    setMateriaFiltro("")
    setDiaFiltro("")
  }

  return (
    <div className="container">
      <div className="top-section">
        <input
          className='input'
          type="text"
          placeholder='Título'
          onChange={e => setTitulo(e.target.value)}
          value={titulo}
        />
        <input
          className='input'
          type="text"
          placeholder='Descrição'
          onChange={e => setDesc(e.target.value)}
          value={desc}
        />

        <div className="checkbox-group">
          {diasSemana.map((dia) => (
            <label key={dia}>
              <input
                type="checkbox"
                onChange={() => handleCheckDia(dia)}
                checked={dias.includes(dia)}
              />
              <span>{dia}</span>
            </label>
          ))}
        </div>

        <select
          className="select"
          value={materia}
          onChange={e => setMateria(e.target.value)}
        >
          <option value="">Matéria</option>
          {materias.map(mat => (
            <option key={mat} value={mat}>{mat}</option>
          ))}
        </select>

        <button className="btn" onClick={handleClick}>Adicionar tarefa</button>
        <button className="btn outline" onClick={abrirFiltro}>Filtrar tarefas</button>

        {mostrarFiltro && (
          <div className="filtro-box">
            <select
              value={materiaFiltro}
              onChange={e => setMateriaFiltro(e.target.value)}
              className="select"
            >
              <option value="">Matéria</option>
              {materias.map(mat => (
                <option key={mat} value={mat}>{mat}</option>
              ))}
            </select>
            <select
              value={diaFiltro}
              onChange={e => setDiaFiltro(e.target.value)}
              className="select"
            >
              <option value="">Dia</option>
              {diasSemana.map(dia => (
                <option key={dia} value={dia}>{dia}</option>
              ))}
            </select>
            <button className="btn" onClick={aplicarFiltro}>Filtrar</button>
            <button className="btn outline" onClick={() => setMostrarFiltro(false)}>Cancelar</button>
          </div>
        )}
      </div>

      <div className="bottom-section">
        <h2>{tarefasFiltradas.length > 0 ? "Tarefas Filtradas" : "Todas as Tarefas"}</h2>
        <div className="tarefas-box">
          {(tarefasFiltradas.length > 0 ? tarefasFiltradas : tarefas).map(tarefa => (
            <div key={tarefa.id} className="tarefa">
              <p><strong>Título:</strong> {tarefa.titulo}</p>
              <p><strong>Descrição:</strong> {tarefa.desc}</p>
              <p><strong>Matéria:</strong> {tarefa.materia}</p>
              <p><strong>Dias:</strong> {tarefa.dias.join(", ")}</p>
              <p><strong>Status:</strong> {tarefa.concluida ? "Concluída" : "Pendente"}</p>
              <div className="tarefa-buttons">
                <button className="btn small" onClick={() => toggleConcluir(tarefa.id)}>
                  {tarefa.concluida ? "Desmarcar" : "Concluir"}
                </button>
                <button className="btn small outline" onClick={() => removerTarefa(tarefa.id)}>Remover</button>
              </div>
            </div>
          ))}
          {tarefasFiltradas.length > 0 && (
            <button className="btn limpar" onClick={limparFiltro}>Limpar Filtro</button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
