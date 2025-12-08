import React, { useState } from 'react';
import { useQuiz } from './QuizContext';

const BancoDePerguntas = ({ onAdicionarPergunta, perguntas, onExcluir, onEditar }) => {
  const { t } = useQuiz();
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas as Categorias');

  const perguntasFiltradas = perguntas.filter(p => {
    const correspondeBusca = p.pergunta.toLowerCase().includes(termoBusca.toLowerCase());
    const correspondeCategoria = categoriaFiltro === 'Todas as Categorias' || p.categoria === categoriaFiltro;
    return correspondeBusca && correspondeCategoria;
  });

  const categoriasUnicas = ['Todas as Categorias', ...new Set(perguntas.map(p => p.categoria))];

  const lidarComExclusao = (id) => {
    // Você pode usar t('msg_confirmar_exclusao') aqui se adicionar ao contexto
    if (window.confirm(`Tem certeza que deseja excluir a pergunta ID ${id}?`)) {
      onExcluir(id); 
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-0 rounded-xl transition-colors duration-300">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Banco de Perguntas</h2>
        <button 
          onClick={onAdicionarPergunta}
          className="flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150"
        >
          <span className="text-xl mr-1">+</span> Adicionar Pergunta
        </button>
      </header>

      {/* Busca e Filtros */}
      <div className="flex space-x-4 mb-6">
        <div className="flex-grow relative">
          <input
            type="text"
            placeholder="Buscar perguntas..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
        </div>
        
        <select
          className="p-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
        >
          {categoriasUnicas.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-3/5">Pergunta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/5">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/5">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {perguntasFiltradas.length > 0 ? (
              perguntasFiltradas.map((item) => (
                <tr key={item.id} className="hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-100">
                  <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item.pergunta}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {item.categoria}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    {/* Botão EDITAR */}
                    <button 
                      onClick={() => onEditar(item)}
                      className="text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400 transition duration-150" 
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => lidarComExclusao(item.id)}
                      className="text-red-500 hover:text-red-600 transition duration-150"
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                  Nenhuma pergunta encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BancoDePerguntas;