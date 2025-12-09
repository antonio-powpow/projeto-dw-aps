import React, { useState, useEffect } from 'react';
import { QuizProvider, useQuiz } from './QuizContext'; // Importamos useQuiz aqui
import { supabase } from '../supabaseClient'; 

import BarraLateral from './BarraLateral'; 
import BancoDePerguntas from './BancoDePerguntas'; 
import FormularioNovaPergunta from './FormularioNovaPergunta'; 
import Configuracoes from './Configuracoes'; 
import { useNavigate } from 'react-router-dom';

const ConteudoGerenciador = () => {
  // 1. Pegamos a função de tradução do contexto
  const { t } = useQuiz();
  const navigate=useNavigate();
  const [telaAtiva, setTelaAtiva] = useState('banco');
  const [listaPerguntas, setListaPerguntas] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [perguntaEditando, setPerguntaEditando] = useState(null);

  // --- 1. BUSCAR PERGUNTAS (READ) ---
  const buscarPerguntas = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('perguntas')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.error('Erro ao buscar perguntas:', error);
      alert(t('alert_erro_generico')); // Traduzido
    } else {
      setListaPerguntas(data);
    }
    setLoading(false);
  };
  function categoria() {
    navigate("/categoria");}

  useEffect(() => {
    buscarPerguntas();
  }, []);

  // --- 2. SALVAR PERGUNTAS (CREATE & UPDATE) ---
  const salvarPergunta = async (dadosFormulario) => {
    const novaPerguntaDB = {
      pergunta: dadosFormulario.pergunta, 
      categoria: dadosFormulario.categoria,
      opcoes: dadosFormulario.opcoes, 
      resposta_correta: dadosFormulario.respostaCorreta 
    };

    try {
      if (dadosFormulario.id) {
        // --- EDIÇÃO (UPDATE) ---
        const { error } = await supabase
          .from('perguntas')
          .update(novaPerguntaDB)
          .eq('id', dadosFormulario.id);

        if (error) throw error;
        alert(t('alert_sucesso_editar')); // Traduzido

      } else {
        // --- CRIAÇÃO (INSERT) ---
        const { error } = await supabase
          .from('perguntas')
          .insert([novaPerguntaDB]);

        if (error) throw error;
        alert(t('alert_sucesso_criar')); // Traduzido
      }

      buscarPerguntas();
      setPerguntaEditando(null);
      setTelaAtiva('banco');

    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert(t('alert_erro_generico')); // Traduzido
    }
  };

  // --- 3. EXCLUIR PERGUNTA (DELETE) ---
  const excluirPergunta = async (id) => {
    try {
      const { error } = await supabase
        .from('perguntas')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Remove da lista localmente
      setListaPerguntas(listaPerguntas.filter(p => p.id !== id));
      alert(t('alert_sucesso_excluir')); // Traduzido
      
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert(t('alert_erro_generico')); // Traduzido
    }
  };

  // --- NAVEGAÇÃO ---

  const iniciarEdicao = (perguntaDoBanco) => {
    const perguntaParaForm = {
      ...perguntaDoBanco,
      respostaCorreta: perguntaDoBanco.resposta_correta,
      opcoes: Array.isArray(perguntaDoBanco.opcoes) ? perguntaDoBanco.opcoes : ['', '', '', '']
    };
    
    setPerguntaEditando(perguntaParaForm);
    setTelaAtiva('form');
  };

  const iniciarCriacao = () => {
    setPerguntaEditando(null);
    setTelaAtiva('form');
  };

  // --- RENDERIZAÇÃO ---
  const renderizarConteudo = () => {
    switch (telaAtiva) {
      case 'banco':
        if (loading) {
          return (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-400 text-xl animate-pulse">{t('msg_carregando')}</p>
            </div>
          );
        }
        return (
          <BancoDePerguntas 
            perguntas={listaPerguntas}
            onExcluir={excluirPergunta}
            onAdicionarPergunta={iniciarCriacao}
            onEditar={iniciarEdicao}
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
            dadosEdicao={perguntaEditando}
          />
        );
      
      case 'config':
        return <Configuracoes />;
      
      case 'jogar':
        return categoria();
      
      default:
        return null;
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

// Componente Principal
const TelaGerenciadorQuiz = () => {
  return (
    <QuizProvider>
      <ConteudoGerenciador />
    </QuizProvider>
  );
};

export default ConteudoGerenciador;