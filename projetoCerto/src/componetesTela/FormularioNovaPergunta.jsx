import React, { useState, useEffect } from 'react';
import { useQuiz } from './QuizContext';

const estiloInput = "w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors";
const estiloLabel = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

const FormularioNovaPergunta = ({ onCancelar, onSalvar, dadosEdicao }) => {
  const { t } = useQuiz(); // Hook de tradução
  
  const [dadosPergunta, setDadosPergunta] = useState({
    categoria: 'Filantrópicas',
    pergunta: '',
    opcoes: ['', '', '', ''], 
    respostaCorreta: null,   
    id: null
  });

  useEffect(() => {
    if (dadosEdicao) {
      setDadosPergunta({
        categoria: dadosEdicao.categoria,
        pergunta: dadosEdicao.pergunta,
        opcoes: Array.isArray(dadosEdicao.opcoes) ? dadosEdicao.opcoes : ['', '', '', ''],
        respostaCorreta: dadosEdicao.respostaCorreta,
        id: dadosEdicao.id
      });
    }
  }, [dadosEdicao]);

  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    setDadosPergunta(anterior => ({ ...anterior, [name]: value }));
  };

  const lidarComMudancaOpcao = (index, valor) => {
    const novasOpcoes = [...dadosPergunta.opcoes];
    novasOpcoes[index] = valor;
    
    setDadosPergunta(anterior => ({
      ...anterior,
      opcoes: novasOpcoes
    }));
  };

  const selecionarCorreta = (index) => {
    setDadosPergunta(anterior => ({ ...anterior, respostaCorreta: index }));
  };

  const lidarComSalvamento = () => {
    // Alertas Traduzidos
    if (!dadosPergunta.pergunta) {
      alert(t('alert_erro_texto'));
      return;
    }
    if (dadosPergunta.opcoes.some(opt => opt.trim() === '')) {
      alert(t('alert_erro_opcoes'));
      return;
    }
    if (dadosPergunta.respostaCorreta === null) {
      alert(t('alert_erro_correta'));
      return;
    }

    if (onSalvar) {
      onSalvar(dadosPergunta); 
    }
  };
  
  // Títulos Traduzidos
  const tituloTela = dadosEdicao ? t('form_titulo_editar') : t('form_titulo_criar');
  const textoBotao = dadosEdicao ? t('form_btn_salvar_editar') : t('form_btn_salvar_criar');

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl transition-colors duration-300">
      <header className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-5 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{tituloTela}</h2>
        <div className="flex space-x-3">
          <button 
            onClick={onCancelar}
            className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white transition duration-150"
          >
            {t('btn_cancelar')}
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
        <div>
          <label htmlFor="pergunta" className={estiloLabel}>{t('label_texto')}</label>
          <textarea
            id="pergunta"
            name="pergunta"
            placeholder={t('placeholder_texto')}
            className={`${estiloInput} h-24 resize-none`}
            value={dadosPergunta.pergunta}
            onChange={lidarComMudanca}
          />
        </div>

        <div>
          <p className={estiloLabel}>
            {t('label_opcoes')} <span className="text-xs text-gray-500 ml-2">{t('label_opcoes_sub')}</span>
          </p>
          
          {dadosPergunta.opcoes.map((opcao, index) => (
            <div key={index} className="flex items-center space-x-4 mb-3">
              <input 
                type="radio" 
                name="respostaCorreta" 
                className="form-radio h-5 w-5 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 cursor-pointer focus:ring-blue-500"
                checked={dadosPergunta.respostaCorreta === index}
                onChange={() => selecionarCorreta(index)}
              /> 
              
              <input
                type="text"
                placeholder={`${t('placeholder_opcao')} ${index + 1}`}
                className={estiloInput}
                value={opcao}
                onChange={(e) => lidarComMudancaOpcao(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="categoria" className={estiloLabel}>{t('label_categoria')}</label>
          <select
            id="categoria"
            name="categoria"
            className={estiloInput}
            value={dadosPergunta.categoria}
            onChange={lidarComMudanca}
          >
            {/* O value vai para o banco (fixo), o Texto exibido é traduzido */}
            <option value="Filantrópicas">{t('cat_filantropicas')}</option>
            <option value="Esportivas">{t('cat_esportivas')}</option>
            <option value="Recreativas">{t('cat_recreativas')}</option>
            <option value="Culturais">{t('cat_culturais')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FormularioNovaPergunta;