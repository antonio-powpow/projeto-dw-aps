import React, { useState } from 'react';

const quizzesMock = [
  { id: 1, titulo: 'Gincana 2024 - Quiz 1', categoria: 'Filantrópicas', questoes: 25 },
  { id: 2, titulo: 'Quiz Cultural UTFPR', categoria: 'Culturais', questoes: 15 },
  { id: 3, titulo: 'Desafios Esportivos 2024', categoria: 'Esportivas', questoes: 20 },
  { id: 4, titulo: 'Quiz de Atividades Recreativas', categoria: 'Recreativas', questoes: 30 },
];

const GestaoQuizzes = ({ onCriarQuiz }) => {
  const [quizzes, setQuizzes] = useState(quizzesMock);
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas as Categorias');
  
  // ESTADO PARA O MODAL DE EXCLUSÃO
  // Se for null, o modal está fechado. Se tiver um ID, o modal está aberto.
  const [quizParaExcluir, setQuizParaExcluir] = useState(null);

  // Lógica de filtro
  const quizzesFiltrados = quizzes.filter(q => {
    const correspondeBusca = q.titulo.toLowerCase().includes(termoBusca.toLowerCase());
    const correspondeCategoria = categoriaFiltro === 'Todas as Categorias' || q.categoria === categoriaFiltro;
    return correspondeBusca && correspondeCategoria;
  });

  const categoriasUnicas = ['Todas as Categorias', ...new Set(quizzesMock.map(q => q.categoria))];

  // --- FUNÇÕES DE EXCLUSÃO ---

  // 1. Chamada quando clica na lixeira: Apenas abre o modal
  const iniciarExclusao = (id) => {
    setQuizParaExcluir(id);
  };

  // 2. Chamada quando clica em "Sim": Remove o item e fecha o modal
  const confirmarExclusao = () => {
    setQuizzes(quizzes.filter(q => q.id !== quizParaExcluir));
    setQuizParaExcluir(null);
    console.log(`Quiz ID ${quizParaExcluir} deletado com sucesso.`);
  };

  // 3. Chamada quando clica em "Não": Apenas fecha o modal
  const cancelarExclusao = () => {
    setQuizParaExcluir(null);
  };

  return (
    <div className="bg-gray-900 rounded-xl relative">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Gestão de Quizzes</h2>
        <button 
          onClick={onCriarQuiz}
          className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150"
        >
          <span className="text-xl mr-1">+</span> Criar Novo Quiz
        </button>
      </header>

      {/* Filtros */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Pesquisar quiz..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        
        <select
          className="p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
        >
          {categoriasUnicas.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto bg-gray-800 rounded-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">TÍTULO DO QUIZ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">CATEGORIA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">QUESTÕES</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">AÇÕES</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {quizzesFiltrados.map((quiz) => (
              <tr key={quiz.id} className="hover:bg-gray-700 transition duration-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  {quiz.titulo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {quiz.categoria}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {quiz.questoes}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-3">
                  <button className="bg-green-700 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition">
                    Jogar
                  </button>
                  <button className="text-gray-400 hover:text-white transition">✏️</button>
                  
                  {/* Botão de Excluir (Lixeira) */}
                  <button 
                    onClick={() => iniciarExclusao(quiz.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                    title="Excluir Quiz"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL DE CONFIRMAÇÃO --- */}
      {quizParaExcluir && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700 max-w-sm w-full">
            <h3 className="text-xl font-bold text-white mb-2">Excluir Quiz?</h3>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja excluir este quiz? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={cancelarExclusao}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition"
              >
                Não
              </button>
              <button 
                onClick={confirmarExclusao}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GestaoQuizzes;