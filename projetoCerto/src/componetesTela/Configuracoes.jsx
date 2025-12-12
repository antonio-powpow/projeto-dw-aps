import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from './QuizContext';
import { supabase } from '../supabaseClient';
import Swal from 'sweetalert2';

const Configuracoes = () => {
  const { tema, idioma, t, salvarConfiguracoes } = useQuiz();
  const navigate = useNavigate(); // Hook para redirecionar o usuário

  const [temaSelecionado, setTemaSelecionado] = useState(tema);
  const [idiomaSelecionado, setIdiomaSelecionado] = useState(idioma);

  useEffect(() => {
    setTemaSelecionado(tema);
    setIdiomaSelecionado(idioma);
  }, [tema, idioma]);

  const lidarComSalvar = () => {
    salvarConfiguracoes(temaSelecionado, idiomaSelecionado);
  };

  // <<<<<<< FUNÇÃO ATUALIZADA PARA CHAMAR A FUNÇÃO SQL (RPC) >>>>>>>>>
  const lidarComExcluirConta = async () => {
    const result = await Swal.fire({
      title: 'Você tem certeza?',
      text: "Esta ação não pode ser revertida. Todos os seus dados serão permanentemente apagados.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, apagar minha conta!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: 'Apagando sua conta...',
          text: 'Por favor, aguarde.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        // Chama a função 'delete_user_account' que você criou no banco de dados
        const { error } = await supabase.rpc('delete_user_account');

        if (error) {
          // Se a chamada RPC retornar um erro, ele será capturado aqui
          throw new Error(error.message);
        }

        // Importante: Faz o logout no cliente para limpar a sessão local
        await supabase.auth.signOut();

        Swal.close(); // Fecha o pop-up de carregamento

        await Swal.fire(
          'Conta Apagada!',
          'Sua conta foi apagada com sucesso.',
          'success'
        );

        // Redireciona o usuário para a página inicial/login
        navigate('/');

      } catch (error) {
        Swal.fire(
          'Erro!',
          'Não foi possível apagar sua conta: ' + error.message,
          'error'
        );
      }
    }
  };

  const haAlteracoes = temaSelecionado !== tema || idiomaSelecionado !== idioma;

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white rounded-xl p-6 min-h-full relative transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-8">{t('config_titulo')}</h2>

      {/* Seção de Preferências (sem alterações) */}
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

      {/* Seção da Conta */}
      <section className="mb-10">
        <h3 className="text-xl font-semibold mb-6 border-b border-gray-200 dark:border-gray-700 pb-2">
          {t('config_conta')}
        </h3>
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

      {/* Botão Salvar */}
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
