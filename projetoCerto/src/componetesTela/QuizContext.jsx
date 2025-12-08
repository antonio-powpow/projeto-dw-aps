import React, { createContext, useState, useContext, useEffect } from 'react';

const traducoes = {
  'pt-BR': {
    sidebar_jogar: 'Jogar',
    sidebar_banco: 'Banco de Questões',
    sidebar_config: 'Configurações',
    sidebar_sair: 'Sair',
    config_titulo: 'Configurações',
    config_pref_app: 'Preferências da Aplicação',
    config_tema: 'Tema do Sistema',
    config_tema_desc: 'Selecione o tema de sua preferência para a interface.',
    config_idioma: 'Idioma',
    config_idioma_desc: 'Defina o idioma padrão da aplicação.',
    config_conta: 'Conta',
    config_senha: 'Alterar Senha',
    config_senha_desc: 'Altere a senha de acesso da sua conta.',
    config_excluir: 'Excluir Conta',
    config_excluir_desc: 'Esta ação é irreversível e irá apagar todos os seus dados.',
    btn_salvar: 'Salvar Alterações',
    btn_cancelar: 'Cancelar',
    // ... adicione as outras chaves do Gestão de Quizzes aqui se precisar
    quiz_titulo_pag: 'Gestão de Quizzes', // Exemplo
  },
  'en-US': {
    sidebar_jogar: 'Play',
    sidebar_banco: 'Question Bank',
    sidebar_config: 'Settings',
    sidebar_sair: 'Logout',
    config_titulo: 'Settings',
    config_pref_app: 'Application Preferences',
    config_tema: 'System Theme',
    config_tema_desc: 'Select your preferred interface theme.',
    config_idioma: 'Language',
    config_idioma_desc: 'Set the default application language.',
    config_conta: 'Account',
    config_senha: 'Change Password',
    config_senha_desc: 'Change your account access password.',
    config_excluir: 'Delete Account',
    config_excluir_desc: 'This action is irreversible and will delete all your data.',
    btn_salvar: 'Save Changes',
    btn_cancelar: 'Cancel',
    quiz_titulo_pag: 'Quiz Management', // Exemplo
  }
};

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  // ESTADO OFICIAL DA APLICAÇÃO
  // Só muda quando clica em Salvar
  const [tema, setTema] = useState('Escuro');
  const [idioma, setIdioma] = useState('pt-BR');

  // Efeito que aplica o CSS do tema no HTML
  useEffect(() => {
    const root = window.document.documentElement;
    if (tema === 'Escuro') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [tema]);

  // Função de Tradução
  const t = (chave) => {
    return traducoes[idioma][chave] || chave;
  };

  // Função chamada pelo botão "Salvar" para efetivar as mudanças
  const salvarConfiguracoes = (novoTema, novoIdioma) => {
    setTema(novoTema);
    setIdioma(novoIdioma);
    alert("Configurações aplicadas com sucesso!");
  };

  return (
    <QuizContext.Provider value={{
      tema,      // Estado oficial (leitura)
      idioma,    // Estado oficial (leitura)
      t,         // Função tradutora
      salvarConfiguracoes // Função para atualizar
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);