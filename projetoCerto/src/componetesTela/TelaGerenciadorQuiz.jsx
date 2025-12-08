import React, { useState } from 'react';
import BarraLateral from './BarraLateral'; 
import BancoDePerguntas from './BancoDePerguntas'; 
import FormularioNovaPergunta from './FormularioNovaPergunta'; 
import { useNavigate } from "react-router-dom";

import Configuracoes from './Configuracoes'; 

// Movemos os dados iniciais para cá (ou deixe vazio [])
const perguntasIniciais = [];

const TelaGerenciadorQuiz = () => {
  const navigate = useNavigate();

  function categoria() {
    navigate("/categoria");
  }
  const [telaAtiva, setTelaAtiva] = useState('quizzes');
  
  // 1. O Estado das perguntas agora vive aqui no Pai
  const [listaPerguntas, setListaPerguntas] = useState(perguntasIniciais);

  // 2. Função para adicionar uma nova pergunta na lista
  const adicionarPergunta = (novaPergunta) => {
    const novaComId = { 
      ...novaPergunta, 
      id: Date.now(), // Gera um ID único baseado no tempo
      pergunta: novaPergunta.texto // Ajusta o nome do campo para bater com a tabela
    };
    
    setListaPerguntas([...listaPerguntas, novaComId]);
    setTelaAtiva('banco'); // Volta para a tela do banco automaticamente
  };

  // 3. Função para excluir pergunta (precisa ser passada para o banco)
  const excluirPergunta = (id) => {
    setListaPerguntas(listaPerguntas.filter(p => p.id !== id));
  };

  const renderizarConteudo = () => {
    switch (telaAtiva) {
      case 'banco':
        return (
          <BancoDePerguntas 
            // Passamos a lista e a função de excluir para o componente
            perguntas={listaPerguntas}
            onExcluir={excluirPergunta}
            onAdicionarPergunta={() => setTelaAtiva('form')} 
          />
        );
      
      case 'form':
        return (
          <FormularioNovaPergunta 
            onCancelar={() => setTelaAtiva('banco')} 
            // Passamos a função que realmente salva os dados
            onSalvar={adicionarPergunta} 
          />
        );
      
      case 'jogar':
        return categoria();
      
      case 'config':
        return <Configuracoes />;
      
      
        
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <BarraLateral telaAtual={telaAtiva} aoNavegar={setTelaAtiva} /> 
      <main className="flex-1 p-8 overflow-y-auto">
        {renderizarConteudo()}
      </main>
    </div>
  );
};

export default TelaGerenciadorQuiz;