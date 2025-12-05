import React, { useState } from 'react';

const estiloInput = "w-full p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500";
const estiloLabel = "block text-sm font-medium text-gray-300 mb-2";

const FormularioNovaPergunta = ({ onCancelar, onSalvar }) => {
  const [dadosPergunta, setDadosPergunta] = useState({
    texto: '', // Atenção: no banco chamamos isso de 'pergunta', faremos a conversão no pai
    opcoes: { A: '', B: '', C: '', D: '' },
    peso: 10,
    categoria: 'Sobre UTFPR',
  });

  const lidarComMudanca = (e) => {
    const { name, value } = e.target;
    const valor = name === 'peso' ? Number(value) : value;
    setDadosPergunta(anterior => ({ ...anterior, [name]: valor }));
  };

  const lidarComMudancaOpcao = (chave, valor) => {
    setDadosPergunta(anterior => ({
      ...anterior,
      opcoes: { ...anterior.opcoes, [chave]: valor }
    }));
  };

  const lidarComSalvamento = () => {
    if (!dadosPergunta.texto) {
      alert("Por favor, escreva o texto da pergunta.");
      return;
    }

    // AQUI É A MÁGICA: Passamos os dados para o componente Pai
    if (onSalvar) {
      onSalvar(dadosPergunta); 
    }
  };
  
  return (
    <div className="bg-gray-800 p-8 rounded-xl shadow-2xl">
      <header className="flex justify-between items-center border-b border-gray-700 pb-5 mb-6">
        <h2 className="text-2xl font-semibold text-white">Criar Nova Pergunta</h2>
        <div className="flex space-x-3">
          <button 
            onClick={onCancelar}
            className="px-4 py-2 text-gray-400 hover:text-white transition duration-150"
          >
            Cancelar
          </button>
          <button 
            onClick={lidarComSalvamento}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150"
          >
            Salvar Pergunta
          </button>
        </div>
      </header>

      {/* Resto do formulário (Inputs) continua igual... */}
      <div className="space-y-6">
        <div>
          <label htmlFor="textoPergunta" className={estiloLabel}>Texto da Pergunta</label>
          <textarea
            id="textoPergunta"
            name="texto"
            placeholder="Ex: Em que ano a UTFPR foi fundada como Universidade Federal?"
            className={`${estiloInput} h-24 resize-none`}
            value={dadosPergunta.texto}
            onChange={lidarComMudanca}
          />
        </div>
        
        {/* ... (códigos das opções e selects continuam iguais) */}
        {/* Vou omitir para não ficar repetitivo, mas mantenha o código anterior dos inputs aqui */}
        <div>
          <p className={estiloLabel}>Opções de Resposta</p>
          {Object.keys(dadosPergunta.opcoes).map((chave) => (
            <div key={chave} className="flex items-center space-x-4 mb-3">
              <input type="radio" name="opcaoCorreta" disabled className="form-radio h-5 w-5 text-blue-600 bg-gray-700 border-gray-600" /> 
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

        <div className="flex space-x-6">
          <div className="w-1/2">
            <label htmlFor="peso" className={estiloLabel}>Peso da Pergunta</label>
            <input
              id="peso"
              name="peso"
              type="number"
              className={estiloInput}
              value={dadosPergunta.peso}
              onChange={lidarComMudanca}
            />
          </div>
          
          <div className="w-1/2">
            <label htmlFor="categoria" className={estiloLabel}>Categoria</label>
            <select
              id="categoria"
              name="categoria"
              className={estiloInput}
              value={dadosPergunta.categoria}
              onChange={lidarComMudanca}
            >
              <option value="Sobre UTFPR">Sobre UTFPR</option>
              <option value="História">História</option>
              <option value="Tecnologia">Tecnologia</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormularioNovaPergunta;