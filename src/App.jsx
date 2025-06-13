import { useState } from 'react'
import './App.css'

function App() {
  const [titulo, setTitulo] = useState("")
  const [desc, setDesc] = useState("")
  const [dias, setDias] = useState([])
  const [materia, setMateria] = useState("")
  const [tarefas, setTarefas] = useState([])

  // Estado para controlar se mostra a seleção para filtrar
  const [mostrarFiltro, setMostrarFiltro] = useState(false)
  const [materiaFiltro, setMateriaFiltro] = useState("") // matéria que vai filtrar
  const [tarefasFiltradas, setTarefasFiltradas] = useState([])

  const diasSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"]
  const materias = ["Matemática", "História", "Física", "Português", "Química", "Geografia", "Biologia", "Filosofia"]

  // Adiciona nova tarefa
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
    setMostrarFiltro(false)  // Esconde filtro ao adicionar nova tarefa
    setTarefasFiltradas([])  // Limpa resultado do filtro
    setMateriaFiltro("")
  }

  // Lógica de dias escolhidos
  const handleCheckDia = (dia) => {
    if (dias.includes(dia)) {
      setDias(dias.filter(d => d !== dia))
    } else {
      setDias([...dias, dia])
    }
  }

  // Alterna tarefa concluída
  const toggleConcluir = (id) => {
    const novas = tarefas.map(tarefa =>
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    )
    setTarefas(novas)
  }

  // Remove tarefa
  const removerTarefa = (id) => {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
    // Atualiza a lista filtrada caso esteja filtrando
    setTarefasFiltradas(tarefasFiltradas.filter(tarefa => tarefa.id !== id))
  }

  // Quando clicar em filtrar, mostra a lista de matérias para escolher
  const abrirFiltro = () => {
    setMostrarFiltro(true)
    setTarefasFiltradas([])  // Limpa filtro anterior
    setMateriaFiltro("")
  }

  // Executa o filtro após escolher a matéria e clicar em filtrar
  const aplicarFiltro = () => {
    if (materiaFiltro === "") {
      alert("Escolha uma matéria para filtrar!")
      return
    }
    const filtradas = tarefas.filter(tarefa => tarefa.materia === materiaFiltro)
    setTarefasFiltradas(filtradas)
    setMostrarFiltro(false)
  }

  // Para limpar o filtro e mostrar tudo novamente
  const limparFiltro = () => {
    setTarefasFiltradas([])
    setMateriaFiltro("")
  }

  return (
    <div className="container">
      <div className="card">

        <input
          className='titulo'
          type="text"
          placeholder='Digite o título...'
          onChange={e => setTitulo(e.target.value)}
          value={titulo}
        />
        <input
          className='desc'
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
          <select
            className="select-materia"
            value={materia}
            onChange={e => setMateria(e.target.value)}
          >
            <option value="">Escolha a matéria...</option>
            {materias.map(mat => (
              <option key={mat} value={mat}>{mat}</option>
            ))}
          </select>
        </div>

        <button onClick={handleClick}>Adicionar tarefa</button>

        <hr />

        {/* Botão para mostrar filtro */}
        <button onClick={abrirFiltro}>Filtrar tarefas por matéria</button>

        {/* Se mostrarFiltro for true, exibe o select para escolher matéria e o botão para filtrar */}
        {mostrarFiltro && (
          <div style={{ marginTop: "10px" }}>
            <select
              value={materiaFiltro}
              onChange={e => setMateriaFiltro(e.target.value)}
            >
              <option value="">Escolha a matéria para filtrar...</option>
              {materias.map(mat => (
                <option key={mat} value={mat}>{mat}</option>
              ))}
            </select>
            <button onClick={aplicarFiltro}>Filtrar</button>
            <button onClick={() => setMostrarFiltro(false)}>Cancelar</button>
          </div>
        )}

        <hr />

        {/* Lista de tarefas filtradas, se houver */}
        {tarefasFiltradas.length > 0 ? (
          <>
            <h2>Tarefas Filtradas</h2>
            {tarefasFiltradas.map(tarefa => (
              <div key={tarefa.id}>
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
            <button onClick={limparFiltro} style={{ marginTop: '10px' }}>Limpar filtro</button>
          </>
        ) : (
          <>
            <h2>Lista de Tarefas</h2>
            {tarefas.length === 0 && <p>Nenhuma tarefa adicionada.</p>}
            {tarefas.map(tarefa => (
              <div key={tarefa.id}>
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
          </>
        )}

      </div>
    </div>
  )
}

export default App
