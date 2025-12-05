import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// Recebe props para controlar qual item está ativo e a função de navegação
const BarraLateral = ({ telaAtual, aoNavegar }) => {
  const navigate = useNavigate();
  function Sair(){
    navigate("/categoria")
    
  }
  
  // Adicionamos 'id' para facilitar a identificação da tela
  const itensMenu = [
    { id: 'jogar', nome: 'Jogar', icone: '🎮' },
    { id: 'quizzes', nome: 'Quizzes', icone: '📝' }, // ID matches the state in parent
    { id: 'banco', nome: 'Banco de Questões', icone: '❓' }, // Alterei o nome para bater com a imagem 2
    { id: 'config', nome: 'Configurações', icone: '⚙️' },
  ];

  return (
    <div className="w-64 flex flex-col justify-between bg-gray-800 p-6 shadow-2xl">
      <div>
        <div className="flex items-center mb-10">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg mr-3">
            A
          </div>
          <div>
            <p className="text-white font-semibold">Admin</p>
            <p className="text-sm text-gray-400">Quiz Manager</p>
          </div>
        </div>

        <nav className="space-y-2">
          {itensMenu.map((item) => (
            <button
              key={item.id}
              onClick={() => aoNavegar(item.id)} // Chama a função para mudar a tela
              className={`w-full text-left flex items-center p-3 rounded-lg transition duration-200 
                ${telaAtual === item.id || (telaAtual === 'form' && item.id === 'banco')
                  ? 'bg-blue-900 bg-opacity-50 text-blue-400 font-bold'
                  : 'text-gray-300 hover:bg-gray-700'
                }`}
            >
              <span className="mr-3">{item.icone}</span>
              {item.nome}
            </button>
          ))}
        </nav>
        
      </div>
     
      <button onClick={Sair} className="text-gray-400 hover:text-red-500 flex items-center p-3"
      
      >
        ➡️ Sair
      </button>
    </div>
  );
};

export default BarraLateral;