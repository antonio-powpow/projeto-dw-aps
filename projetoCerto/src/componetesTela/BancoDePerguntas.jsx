import React, { useState } from 'react';

// Agora recebemos 'perguntas' e 'onExcluir' como PROPS vindas do pai
const BancoDePerguntas = ({ onAdicionarPergunta, perguntas, onExcluir }) => {
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas as Categorias');

  // Filtragem baseada nas props recebidas
  const perguntasFiltradas = perguntas.filter(p => {
    const correspondeBusca = p.pergunta.toLowerCase().includes(termoBusca.toLowerCase());
    const correspondeCategoria = categoriaFiltro === 'Todas as Categorias' || p.categoria === categoriaFiltro;
    return correspondeBusca && correspondeCategoria;
  });

  const categoriasUnicas = ['Todas as Categorias', ...new Set(perguntas.map(p => p.categoria))];

  const lidarComExclusao = (id) => {
    if (window.confirm(`Tem certeza que deseja excluir a pergunta ID ${id}?`)) {
      // Chama a função do pai para excluir
      onExcluir(id); 
    }
  };

  return (
    <div className="bg-gray-900 p-0 rounded-xl">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-white">Banco de Perguntas</h2>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-3/5">Pergunta</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-1/5">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider w-1/5">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {perguntasFiltradas.length > 0 ? (
              perguntasFiltradas.map((item) => (
                <tr key={item.id} className="hover:bg-gray-700 transition duration-100">
                  <td className="px-6 py-4 whitespace-normal text-sm font-medium text-gray-200">
                    {item.pergunta}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {item.categoria}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-3">
                    <button className="text-yellow-500 hover:text-yellow-600 transition duration-150" title="Editar">✏️</button>
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
                <td colSpan="3" className="px-6 py-4 text-center text-gray-400">
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