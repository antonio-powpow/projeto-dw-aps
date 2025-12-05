import React, { useState } from 'react';

const Configuracoes = () => {
  // Estados para os campos do formulário
  const [tema, setTema] = useState('Escuro');
  const [idioma, setIdioma] = useState('Português (Brasil)');

  const lidarComSalvar = () => {
    alert('Configurações salvas com sucesso!');
    console.log({ tema, idioma });
  };

  const lidarComExcluirConta = () => {
    if (window.confirm("ATENÇÃO: Essa ação é irreversível. Deseja realmente excluir sua conta?")) {
      alert("Conta excluída.");
    }
  };

  const lidarComAlterarSenha = () => {
    alert("Redirecionar para alteração de senha...");
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 min-h-full relative">
      <h2 className="text-3xl font-bold text-white mb-8">Configurações</h2>

      {/* --- Seção 1: Preferências da Aplicação --- */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">
          Preferências da Aplicação
        </h3>

        {/* Item: Tema */}
        <div className="flex justify-between items-center mb-6">
          <div className="max-w-md">
            <label className="text-white font-medium text-lg">Tema do Sistema</label>
            <p className="text-gray-400 text-sm mt-1">
              Selecione o tema de sua preferência para a interface.
            </p>
          </div>
          <div className="w-64">
            <select
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="Escuro">Escuro</option>
              <option value="Claro">Claro</option>
              <option value="Sistema">Padrão do Sistema</option>
            </select>
          </div>
        </div>

        {/* Item: Idioma */}
        <div className="flex justify-between items-center">
          <div className="max-w-md">
            <label className="text-white font-medium text-lg">Idioma</label>
            <p className="text-gray-400 text-sm mt-1">
              Defina o idioma padrão da aplicação.
            </p>
          </div>
          <div className="w-64">
            <select
              value={idioma}
              onChange={(e) => setIdioma(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="Português (Brasil)">Português (Brasil)</option>
              <option value="English (US)">English (US)</option>
              <option value="Español">Español</option>
            </select>
          </div>
        </div>
      </section>

      {/* --- Seção 2: Conta --- */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold text-white mb-6 border-b border-gray-700 pb-2">
          Conta
        </h3>

        {/* Item: Alterar Senha */}
        <div className="flex justify-between items-center mb-6">
          <div className="max-w-md">
            <label className="text-white font-medium text-lg">Alterar Senha</label>
            <p className="text-gray-400 text-sm mt-1">
              Altere a senha de acesso da sua conta.
            </p>
          </div>
          <div>
            <button 
              onClick={lidarComAlterarSenha}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-md transition duration-150 border border-gray-600"
            >
              Alterar Senha
            </button>
          </div>
        </div>

        {/* Item: Excluir Conta */}
        <div className="flex justify-between items-center">
          <div className="max-w-md">
            <label className="text-red-500 font-medium text-lg">Excluir Conta</label>
            <p className="text-gray-400 text-sm mt-1">
              Esta ação é irreversível e irá apagar todos os seus dados.
            </p>
          </div>
          <div>
            <button 
              onClick={lidarComExcluirConta}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition duration-150"
            >
              Excluir
            </button>
          </div>
        </div>
      </section>

      {/* --- Footer: Botão Salvar --- */}
      <div className="flex justify-end border-t border-gray-700 pt-6 mt-10">
        <button 
          onClick={lidarComSalvar}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-lg transition duration-150"
        >
          Salvar Alterações
        </button>
      </div>
    </div>
  );
};

export default Configuracoes;