import React, { useState, useEffect } from 'react';
import { QuizProvider } from './QuizContext';
import { supabase } from '../supabaseClient'; // Importa seu cliente Supabase

import BarraLateral from './BarraLateral'; 
import BancoDePerguntas from './BancoDePerguntas'; 
import FormularioNovaPergunta from './FormularioNovaPergunta'; 
import Configuracoes from './Configuracoes'; 
import { useNavigate } from 'react-router-dom';

const ConteudoGerenciador = () => {
  // Estado de navegação e dados
  const navigate=useNavigate();
  const [telaAtiva, setTelaAtiva] = useState('banco');
  const [listaPerguntas, setListaPerguntas] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [perguntaEditando, setPerguntaEditando] = useState(null);

  // --- 1. BUSCAR PERGUNTAS (READ) ---
  const buscarPerguntas = async () => {
    setLoading(true);
    // Busca id, pergunta, categoria, opcoes e resposta_correta da tabela 'perguntas'
    const { data, error } = await supabase
      .from('perguntas')
      .select('*')
      .order('id', { ascending: false }); // Ordena pelas mais recentes

    if (error) {
      console.error('Erro ao buscar perguntas:', error);
      alert('Erro ao carregar perguntas. Verifique o console.');
    } else {
      setListaPerguntas(data);
    }
    setLoading(false);
  };
  function categoria() {
    navigate("/categoria");}

  // Carrega os dados ao abrir a tela
  useEffect(() => {
    buscarPerguntas();
  }, []);

  // --- 2. SALVAR PERGUNTAS (CREATE & UPDATE) ---
  const salvarPergunta = async (dadosFormulario) => {
    // Prepara o objeto para o formato do Supabase
    // O formulário envia: { pergunta, categoria, opcoes (array), respostaCorreta (int) }
    const novaPerguntaDB = {
      pergunta: dadosFormulario.pergunta, 
      categoria: dadosFormulario.categoria,
      opcoes: dadosFormulario.opcoes, // Supabase salva o array como JSONB
      resposta_correta: dadosFormulario.respostaCorreta // Converte camelCase para snake_case
    };

    try {
      if (dadosFormulario.id) {
        // --- EDIÇÃO (UPDATE) ---
        const { error } = await supabase
          .from('perguntas')
          .update(novaPerguntaDB)
          .eq('id', dadosFormulario.id);

        if (error) throw error;
        alert('Pergunta atualizada com sucesso!');

      } else {
        // --- CRIAÇÃO (INSERT) ---
        const { error } = await supabase
          .from('perguntas')
          .insert([novaPerguntaDB]);

        if (error) throw error;
        alert('Pergunta criada com sucesso!');
      }

      // Recarrega a lista do banco para manter tudo sincronizado
      buscarPerguntas();
      
      // Limpa a edição e volta para a tabela
      setPerguntaEditando(null);
      setTelaAtiva('banco');

    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar pergunta. Verifique sua conexão ou console.');
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

      // Remove da lista localmente para não precisar recarregar tudo do banco
      setListaPerguntas(listaPerguntas.filter(p => p.id !== id));
      
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('Erro ao excluir pergunta.');
    }
  };

  // --- FUNÇÕES DE NAVEGAÇÃO E PREPARAÇÃO DE DADOS ---

  // Prepara os dados para o formulário entender (Banco -> Form)
  const iniciarEdicao = (perguntaDoBanco) => {
    const perguntaParaForm = {
      ...perguntaDoBanco,
      // O banco usa 'resposta_correta', o form usa 'respostaCorreta'
      respostaCorreta: perguntaDoBanco.resposta_correta,
      // Garante que 'opcoes' seja um array
      opcoes: Array.isArray(perguntaDoBanco.opcoes) ? perguntaDoBanco.opcoes : ['', '', '', '']
    };
    
    setPerguntaEditando(perguntaParaForm);
    setTelaAtiva('form');
  };

  // Reseta o estado para criar uma nova
  const iniciarCriacao = () => {
    setPerguntaEditando(null);
    setTelaAtiva('form');
  };

  // --- RENDERIZAÇÃO DO CONTEÚDO ---
  const renderizarConteudo = () => {
    switch (telaAtiva) {
      case 'banco':
        if (loading) {
          return (
            <div className="flex h-full items-center justify-center">
              <p className="text-gray-400 text-xl animate-pulse">Carregando perguntas...</p>
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

// Componente Principal Exportado (Envolvido pelo Contexto)
const TelaGerenciadorQuiz = () => {
  return (
    <QuizProvider>
      <ConteudoGerenciador />
    </QuizProvider>
  );
};

export default TelaGerenciadorQuiz;