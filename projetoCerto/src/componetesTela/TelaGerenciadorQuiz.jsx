import React, { useState } from 'react';
import BarraLateral from './BarraLateral'; 
import BancoDePerguntas from './BancoDePerguntas'; 
import FormularioNovaPergunta from './FormularioNovaPergunta'; 
import GestaoQuizzes from './GestaoQuizzes'; // Importar o novo componente

const TelaGerenciadorQuiz = () => {
  // Estados possíveis: 'quizzes', 'banco', 'form', 'jogar', 'config'
  const [telaAtiva, setTelaAtiva] = useState('quizzes'); 

  // Função auxiliar para renderizar o conteúdo correto
  const renderizarConteudo = () => {
    switch (telaAtiva) {
      case 'banco':
        return <BancoDePerguntas onAdicionarPergunta={() => setTelaAtiva('form')} />;
      case 'form':
        return <FormularioNovaPergunta onCancelar={() => setTelaAtiva('banco')} />;
      case 'jogar':
        return <div className="text-white">Tela de Jogo (Em construção)</div>;
      case 'config':
        return <div className="text-white">Configurações (Em construção)</div>;
      default:
        return <GestaoQuizzes />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      
      {/* Passamos o estado e a função de setar estado para a Barra Lateral */}
      <BarraLateral 
        telaAtual={telaAtiva} 
        aoNavegar={setTelaAtiva} 
      /> 
      
      <main className="flex-1 p-8 overflow-y-auto">
        {renderizarConteudo()}
      </main>
      
    </div>
  );
};

export default TelaGerenciadorQuiz;