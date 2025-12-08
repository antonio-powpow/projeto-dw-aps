import React, { useState } from 'react';
import { QuizProvider } from './QuizContext';
import { useNavigate } from "react-router-dom";
import BarraLateral from './BarraLateral'; 
import BancoDePerguntas from './BancoDePerguntas'; 
import FormularioNovaPergunta from './FormularioNovaPergunta'; 
import Configuracoes from './Configuracoes'; 

// Dados iniciais (Mock) ajustados para bater com o formulário
const perguntasIniciais = [
 ];

const ConteudoGerenciador = () => {
  const navigate = useNavigate();
  const [telaAtiva, setTelaAtiva] = useState('banco');
  const [listaPerguntas, setListaPerguntas] = useState(perguntasIniciais);
  
  // ESTADO PARA CONTROLAR A EDIÇÃO
  const [perguntaEditando, setPerguntaEditando] = useState(null);
  function categoria() {
    navigate("/categoria");}

  // Função Unificada: Salva (Cria ou Atualiza)
  const salvarPergunta = (dadosFormulario) => {
    // Ajuste de nomes: Formulário usa 'texto', Banco usa 'pergunta'
    const perguntaFormatada = {
      ...dadosFormulario,
      pergunta: dadosFormulario.texto, 
    };
    

    if (perguntaFormatada.id) {
      // --- MODO EDIÇÃO: Atualiza item existente ---
      setListaPerguntas(listaPerguntas.map(p => 
        p.id === perguntaFormatada.id ? perguntaFormatada : p
      ));
    } else {
      // --- MODO CRIAÇÃO: Adiciona novo item ---
      const novaPergunta = { 
        ...perguntaFormatada, 
        id: Date.now() // Gera ID novo
      };
      setListaPerguntas([...listaPerguntas, novaPergunta]);
    }

    setPerguntaEditando(null); // Limpa edição
    setTelaAtiva('banco'); 
  };

  // Chamada ao clicar no Lápis
  const iniciarEdicao = (pergunta) => {
    setPerguntaEditando(pergunta);
    setTelaAtiva('form');
  };

  // Chamada ao clicar em "Adicionar Pergunta" (Limpa estado anterior)
  const iniciarCriacao = () => {
    setPerguntaEditando(null);
    setTelaAtiva('form');
  };

  const excluirPergunta = (id) => {
    setListaPerguntas(listaPerguntas.filter(p => p.id !== id));
  };

  const renderizarConteudo = () => {
    switch (telaAtiva) {
      case 'banco':
        return (
          <BancoDePerguntas 
            perguntas={listaPerguntas}
            onExcluir={excluirPergunta}
            onAdicionarPergunta={iniciarCriacao} // Usa func que limpa edição
            onEditar={iniciarEdicao} // Passa func de editar
          />
        );
      
      case 'form':
        return (
          <FormularioNovaPergunta 
            onCancelar={() => {
              setPerguntaEditando(null);
              setTelaAtiva('banco');
            }} 
            onSalvar={salvarPergunta}
            dadosEdicao={perguntaEditando} // Passa dados para preencher o form
          />
        );
      
      case 'config': return <Configuracoes />;
      case 'jogar': return categoria();
      
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <BarraLateral telaAtual={telaAtiva} aoNavegar={setTelaAtiva} /> 
      <main className="flex-1 p-8 overflow-y-auto">
        {renderizarConteudo()}
      </main>
    </div>
  );
  
};

const TelaGerenciadorQuiz = () => {
  return (
    <QuizProvider>
      <ConteudoGerenciador />
    </QuizProvider>
  );
};

export default TelaGerenciadorQuiz;