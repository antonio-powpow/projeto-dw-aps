import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from './QuizContext'; // Importa o contexto para tradução e tema

// Seus ícones (certifique-se que o caminho esteja correto no seu projeto)
import ConfigIcon from '/config.png';
import JogarIcon from '/jogar.png';
import BancoIcon from '/banco.png';
import SairIcon from '/sair.png';

const BarraLateral = ({ telaAtual, aoNavegar }) => {
  const navigate = useNavigate();
  const { t } = useQuiz(); // Hook para pegar a função de tradução

  function Sair() {
    navigate("/");
  }

  const itensMenu = [
    // Agora usamos t() para traduzir os nomes, mas mantemos seus ícones
    { id: 'jogar', nome: t('sidebar_jogar'), icone: JogarIcon },
    { id: 'banco', nome: t('sidebar_banco'), icone: BancoIcon },
    { id: 'config', nome: t('sidebar_config'), icone: ConfigIcon },
  ];

  return (
    // Adicionei 'bg-white dark:bg-gray-800' para suportar troca de tema
    <div className="w-64 flex flex-col justify-between bg-white dark:bg-gray-800 p-6 shadow-2xl transition-colors duration-300">
      <div>
        

        <nav className="space-y-2">
          {itensMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => aoNavegar(item.id)}
              className={`w-full text-left flex items-center p-3 rounded-lg transition duration-200 
                ${telaAtual === item.id || (telaAtual === 'form' && item.id === 'banco')
                  ? 'bg-blue-600 bg-opacity-90 text-white font-bold' // Estilo ativo
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700' // Estilo inativo (com suporte a light mode)
                }`}
            >
              {/* Mantive sua estrutura de imagem */}
              <span className="w-6 h-6 mr-4 flex items-center justify-center">
                <img src={item.icone} alt={item.nome} className="max-w-full max-h-full" />
              </span>
              {item.nome}
            </button>
          ))}
        </nav>
      </div>

      <button 
        onClick={Sair} 
        className="text-gray-500 dark:text-gray-400 hover:text-red-500 flex items-center p-3 transition-colors"
      >
         <span className="w-6 h-6 mr-4 flex items-center justify-center">
            <img src={SairIcon} alt="Sair" className="max-w-full max-h-full" />
         </span> 
         {t('sidebar_sair')}
      </button>
    </div>
  );
};

export default BarraLateral;