import React, { useState, useEffect } from 'react';
import { useQuiz } from './QuizContext';

const estiloInput = "w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
const estiloLabel = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

const FormularioNovaPergunta = ({ onCancelar, onSalvar, dadosEdicao }) => {
  const { t } = useQuiz();
  
  const [dadosPergunta, setDadosPergunta] = useState({
    texto: '',
    opcoes: { A: '', B: '', C: '', D: '' },
    categoria: 'Filantrópicas',
    respostaCorreta: '',
    id: null
  });

  // Efeito para carregar dados se for edição
  useEffect(() => {
    if (dadosEdicao) {
      setDadosPergunta({
        texto: dadosEdicao.pergunta,
        opcoes: dadosEdicao.opcoes || { A: '', B: '', C: '', D: '' },
        categoria: dadosEdicao.categoria,
        respostaCorreta: dadosEdicao.respostaCorreta || '',
        id: dadosEdicao.id
      });
    }
  }, [dadosEdicao]);

  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setDadosPergunta(anterior => ({ ...anterior, [name]: value }));
  };

  const lidarComMudancaOpcao = (chave, valor) => {
    setDadosPergunta(anterior => ({
      ...anterior,
      opcoes: { ...anterior.opcoes, [chave]: valor }
    }));
  };

  const selecionarCorreta = (chave) => {
    setDadosPergunta(anterior => ({ ...anterior, respostaCorreta: chave }));
  };

  const lidarComSalvamento = () => {
    if (!dadosPergunta.texto) {
      alert("Por favor, escreva o texto da pergunta.");
      return;
    }
    if (!dadosPergunta.respostaCorreta) {
      alert("Por favor, selecione qual é a alternativa correta.");
      return;
    }
    if (onSalvar) {
      onSalvar(dadosPergunta); 
    }
  };
  
  // Define o Título e o Botão baseado se é edição ou criação
  const tituloTela = dadosEdicao ? "Editar Pergunta" : "Criar Nova Pergunta";
  const textoBotao = dadosEdicao ? "Salvar Alterações" : "Salvar Pergunta";

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl transition-colors duration-300">
      <header className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-5 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{tituloTela}</h2>
        <div className="flex space-x-3">
          <button 
            onClick={onCancelar}
            className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition duration-150"
          >
            Cancelar
          </button>
          <button 
            onClick={lidarComSalvamento}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150"
          >
            {textoBotao}
          </button>
        </div>
      </header>

      <div className="space-y-6">
        {/* Campo de Texto */}
        <div>
          <label htmlFor="textoPergunta" className={estiloLabel}>Texto da Pergunta</label>
          <textarea
            id="textoPergunta"
            name="texto"
            placeholder="Digite a pergunta aqui..."
            className={`${estiloInput} h-24 resize-none`}
            value={dadosPergunta.texto}
            onChange={lidarComMudanca}
          />
        </div>

        {/* Opções de Resposta */}
        <div>
          <p className={estiloLabel}>Opções de Resposta <span className="text-xs text-gray-500 ml-2">(Clique na bolinha para marcar a correta)</span></p>
          {Object.keys(dadosPergunta.opcoes).map((chave) => (
            <div key={chave} className="flex items-center space-x-4 mb-3">
              <input 
                type="radio" 
                name="opcaoCorreta" 
                className="form-radio h-5 w-5 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 cursor-pointer focus:ring-blue-500"
                checked={dadosPergunta.respostaCorreta === chave}
                onChange={() => selecionarCorreta(chave)}
              /> 
              <input
                type="text"
                placeholder={`Opção ${chave}`}
                className={estiloInput}
                value={dadosPergunta.opcoes[chave]}
                onChange={(e) => lidarComMudancaOpcao(chave, e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Categorias */}
        <div>
          <label htmlFor="categoria" className={estiloLabel}>Categoria</label>
          <select
            id="categoria"
            name="categoria"
            className={estiloInput}
            value={dadosPergunta.categoria}
            onChange={lidarComMudanca}
          >
            <option value="Filantrópicas">Filantrópicas</option>
            <option value="Esportivas">Esportivas</option>
            <option value="Recreativas">Recreativas</option>
            <option value="Culturais">Culturais</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FormularioNovaPergunta;