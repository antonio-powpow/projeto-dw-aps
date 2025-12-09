import React, { useState, useEffect } from 'react';
import { useQuiz } from './QuizContext';

const estiloInput = "w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
const estiloLabel = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

const FormularioNovaPergunta = ({ onCancelar, onSalvar, dadosEdicao }) => {
  const { t } = useQuiz();
  
  // O ESTADO AGORA SEGUE EXATAMENTE O FORMATO QUE VOCÊ PEDIU
  const [dadosPergunta, setDadosPergunta] = useState({
    categoria: 'Filantrópicas',
    pergunta: '',
    opcoes: ['', '', '', ''], // Array de 4 posições vazias
    respostaCorreta: null,   // Será um número (índice 0, 1, 2 ou 3)
    id: null
  });

  // Efeito para carregar dados na Edição
  useEffect(() => {
    if (dadosEdicao) {
      setDadosPergunta({
        categoria: dadosEdicao.categoria,
        pergunta: dadosEdicao.pergunta,
        // Garante que seja um array, se não for, cria um padrão
        opcoes: Array.isArray(dadosEdicao.opcoes) ? dadosEdicao.opcoes : ['', '', '', ''],
        respostaCorreta: dadosEdicao.respostaCorreta, // Espera-se um número
        id: dadosEdicao.id
      });
    }
  }, [dadosEdicao]);

  // Atualiza texto da pergunta ou categoria
  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setDadosPergunta(anterior => ({ ...anterior, [name]: value }));
  };

  // Atualiza uma opção específica do Array pelo índice
  const lidarComMudancaOpcao = (index, valor) => {
    const novasOpcoes = [...dadosPergunta.opcoes];
    novasOpcoes[index] = valor;
    
    setDadosPergunta(anterior => ({
      ...anterior,
      opcoes: novasOpcoes
    }));
  };

  // Define o índice da resposta correta (0, 1, 2 ou 3)
  const selecionarCorreta = (index) => {
    setDadosPergunta(anterior => ({ ...anterior, respostaCorreta: index }));
  };

  const lidarComSalvamento = () => {
    if (!dadosPergunta.pergunta) {
      alert("Por favor, escreva o texto da pergunta.");
      return;
    }
    // Verifica se alguma opção está vazia
    if (dadosPergunta.opcoes.some(opt => opt.trim() === '')) {
      alert("Por favor, preencha todas as 4 opções.");
      return;
    }
    // Verifica se respostaCorreta é um número (0 inclui false em boolean check simples, então checamos null)
    if (dadosPergunta.respostaCorreta === null) {
      alert("Por favor, selecione qual é a alternativa correta.");
      return;
    }

    if (onSalvar) {
      // Envia o objeto EXATAMENTE como você pediu
      onSalvar(dadosPergunta); 
    }
  };
  
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
          <label htmlFor="pergunta" className={estiloLabel}>Texto da Pergunta</label>
          <textarea
            id="pergunta"
            name="pergunta"
            placeholder="Digite a pergunta aqui..."
            className={`${estiloInput} h-24 resize-none`}
            value={dadosPergunta.pergunta}
            onChange={lidarComMudanca}
          />
        </div>

        {/* Opções de Resposta (Mapeando o Array) */}
        <div>
          <p className={estiloLabel}>Opções de Resposta <span className="text-xs text-gray-500 ml-2">(Clique na bolinha para marcar a correta)</span></p>
          
          {dadosPergunta.opcoes.map((opcao, index) => (
            <div key={index} className="flex items-center space-x-4 mb-3">
              {/* Radio Button usa o INDEX como valor de controle */}
              <input 
                type="radio" 
                name="respostaCorreta" 
                className="form-radio h-5 w-5 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 cursor-pointer focus:ring-blue-500"
                checked={dadosPergunta.respostaCorreta === index}
                onChange={() => selecionarCorreta(index)}
              /> 
              
              <input
                type="text"
                placeholder={`Opção ${index + 1}`}
                className={estiloInput}
                value={opcao}
                onChange={(e) => lidarComMudancaOpcao(index, e.target.value)}
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