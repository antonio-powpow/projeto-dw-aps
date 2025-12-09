import React, { useState, useEffect } from 'react';
import { useQuiz } from './QuizContext';

const Configuracoes = () => {
  const { tema, idioma, t, salvarConfiguracoes } = useQuiz();

  const [temaSelecionado, setTemaSelecionado] = useState(tema);
  const [idiomaSelecionado, setIdiomaSelecionado] = useState(idioma);

  useEffect(() => {
    setTemaSelecionado(tema);
    setIdiomaSelecionado(idioma);
  }, [tema, idioma]);

  const lidarComSalvar = () => {
    salvarConfiguracoes(temaSelecionado, idiomaSelecionado);
  };

  const lidarComExcluirConta = () => {
    // Mantém o confirm para segurança, mas remove o alert de sucesso
    if (window.confirm(t('config_excluir_desc'))) {
      console.log("Conta excluída (mock)."); 
    }
  };

  const haAlteracoes = temaSelecionado !== tema || idiomaSelecionado !== idioma;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl p-6 min-h-full relative transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-8">{t('config_titulo')}</h2>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          {t('config_pref_app')}
        </h3>

        <div className="flex justify-between items-center mb-6">
          <div className="max-w-md">
            <label className="font-medium text-lg">{t('config_tema')}</label>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('config_tema_desc')}</p>
          </div>
          <div className="w-64">
            <select
              value={temaSelecionado} 
              onChange={(e) => setTemaSelecionado(e.target.value)}
              className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
            >
              <option value="Escuro">Escuro (Dark)</option>
              <option value="Claro">Claro (Light)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="max-w-md">
            <label className="font-medium text-lg">{t('config_idioma')}</label>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('config_idioma_desc')}</p>
          </div>
          <div className="w-64">
            <select
              value={idiomaSelecionado}
              onChange={(e) => setIdiomaSelecionado(e.target.value)}
              className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
            >
              <option value="pt-BR">Português (Brasil)</option>
              <option value="en-US">English (US)</option>
            </select>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          {t('config_conta')}
        </h3>

        <div className="flex justify-between items-center mb-6">
          <div className="max-w-md">
            <label className="font-medium text-lg">{t('config_senha')}</label>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('config_senha_desc')}</p>
          </div>
          <div>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium rounded-md transition duration-150 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200">
              {t('config_senha')}
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="max-w-md">
            <label className="text-red-600 dark:text-red-500 font-medium text-lg">{t('config_excluir')}</label>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{t('config_excluir_desc')}</p>
          </div>
          <div>
            <button 
              onClick={lidarComExcluirConta}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md transition duration-150"
            >
              {t('config_excluir').split(' ')[0]}
            </button>
          </div>
        </div>
      </section>

      {haAlteracoes && (
        <div className="flex justify-end border-t border-gray-200 dark:border-gray-700 pt-6 mt-10 animate-fade-in-up">
          <button 
            onClick={lidarComSalvar}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-lg transition duration-150 transform hover:scale-105"
          >
            {t('btn_salvar')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Configuracoes;