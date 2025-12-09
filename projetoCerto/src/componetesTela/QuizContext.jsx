import React, { createContext, useState, useContext, useEffect } from 'react';

const traducoes = {
  'pt-BR': {
    // --- Login ---
    login_titulo: 'Acesse sua conta',
    login_subtitulo: 'Bem-vindo ao Quiz UTFPR.',
    login_email: 'Email',
    login_senha: 'Senha',
    login_placeholder_email: 'Digite seu email',
    login_placeholder_senha: 'Digite sua senha',
    login_esqueceu: 'Esqueceu sua senha?',
    login_btn_entrar: 'Entrar',
    login_ou: 'ou',
    login_google: 'Entrar com Google',
    login_sem_conta: 'Não tem uma conta?',
    login_cadastre_se: 'Cadastre-se',
    login_frase_esq: '"Teste seus conhecimentos e prepare-se para a gincana. A vitória começa aqui!"',

    // --- Cadastro ---
    cadastro_titulo: 'Crie sua Conta',
    cadastro_subtitulo: 'Bem-vindo ao Quiz da Gincana!',
    cadastro_email: 'E-mail',
    cadastro_senha: 'Senha',
    cadastro_confirmar: 'Confirmar Senha',
    cadastro_placeholder_email: 'Digite seu email',
    cadastro_placeholder_senha: 'Crie sua senha',
    cadastro_placeholder_conf: 'Confirme sua senha',
    cadastro_btn_registrar: 'Registrar',
    cadastro_tem_conta: 'Já tem uma conta?',
    cadastro_faca_login: 'Faça login',

    // --- Categoria (Jogo) ---
    cat_titulo: 'Escolha uma categoria',
    cat_subtitulo: 'Teste seus conhecimentos com perguntas atualizadas!',
    cat_filantropicas: 'Filantrópicas',
    cat_filantropicas_desc: 'Atividades de caridade',
    cat_recreativas: 'Recreativas',
    cat_recreativas_desc: 'Atividades de lazer',
    cat_esportivas: 'Esportivas',
    cat_esportivas_desc: 'Atividades esportivas',
    cat_culturais: 'Culturais',
    cat_culturais_desc: 'Atividades culturais',
    cat_vazia_erro: 'Ainda não há perguntas cadastradas nesta categoria!',

    // --- Perguntas (Jogo) ---
    perg_titulo: 'Quiz UTFPR',
    perg_contador: 'PERGUNTA',
    perg_vazio: 'Nenhuma pergunta encontrada para esta categoria.',

    // --- Resultado ---
    res_titulo: 'Seu Desempenho',
    res_subtitulo: 'Parabéns por concluir o quiz! Aqui está um resumo de como você se saiu',
    res_pontuacao: 'PONTUAÇÃO',
    res_certas: 'Certas',
    res_erradas: 'Erradas',
    res_btn_novamente: 'Jogar Novamente',
    res_btn_outro: 'Jogar outro quiz',

    // --- Admin (Já existentes) ---
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
    banco_titulo: 'Banco de Perguntas',
    btn_adicionar: 'Adicionar Pergunta',
    placeholder_busca: 'Buscar perguntas...',
    todas_categorias: 'Todas as Categorias',
    tab_pergunta: 'Pergunta',
    tab_categoria: 'Categoria',
    tab_acoes: 'Ações',
    msg_vazio: 'Nenhuma pergunta encontrada.',
    msg_carregando: 'Carregando perguntas...',
    msg_confirmar_exclusao: 'Tem certeza que deseja excluir a pergunta ID',
    form_titulo_criar: 'Criar Nova Pergunta',
    form_titulo_editar: 'Editar Pergunta',
    form_btn_salvar_criar: 'Salvar Pergunta',
    form_btn_salvar_editar: 'Salvar Alterações',
    label_texto: 'Texto da Pergunta',
    placeholder_texto: 'Digite a pergunta aqui...',
    label_opcoes: 'Opções de Resposta',
    label_opcoes_sub: '(Clique na bolinha para marcar a correta)',
    placeholder_opcao: 'Opção',
    label_categoria: 'Categoria',
    alert_sucesso_criar: 'Pergunta criada com sucesso!',
    alert_sucesso_editar: 'Pergunta atualizada com sucesso!',
    alert_sucesso_excluir: 'Pergunta excluída!',
    alert_erro_texto: 'Por favor, escreva o texto da pergunta.',
    alert_erro_opcoes: 'Por favor, preencha todas as 4 opções.',
    alert_erro_correta: 'Por favor, selecione qual é a alternativa correta.',
    alert_erro_generico: 'Ocorreu um erro.',
  },
  'en-US': {
    // --- Login ---
    login_titulo: 'Access your account',
    login_subtitulo: 'Welcome to UTFPR Quiz.',
    login_email: 'Email',
    login_senha: 'Password',
    login_placeholder_email: 'Enter your email',
    login_placeholder_senha: 'Enter your password',
    login_esqueceu: 'Forgot your password?',
    login_btn_entrar: 'Sign In',
    login_ou: 'or',
    login_google: 'Sign in with Google',
    login_sem_conta: "Don't have an account?",
    login_cadastre_se: 'Sign Up',
    login_frase_esq: '"Test your knowledge and get ready for the scavenger hunt. Victory starts here!"',

    // --- Cadastro ---
    cadastro_titulo: 'Create your Account',
    cadastro_subtitulo: 'Welcome to the Scavenger Hunt Quiz!',
    cadastro_email: 'Email',
    cadastro_senha: 'Password',
    cadastro_confirmar: 'Confirm Password',
    cadastro_placeholder_email: 'Enter your email',
    cadastro_placeholder_senha: 'Create your password',
    cadastro_placeholder_conf: 'Confirm your password',
    cadastro_btn_registrar: 'Register',
    cadastro_tem_conta: 'Already have an account?',
    cadastro_faca_login: 'Sign in',

    // --- Categoria (Game) ---
    cat_titulo: 'Choose a category',
    cat_subtitulo: 'Test your knowledge with updated questions!',
    cat_filantropicas: 'Philanthropic',
    cat_filantropicas_desc: 'Charity activities',
    cat_recreativas: 'Recreational',
    cat_recreativas_desc: 'Leisure activities',
    cat_esportivas: 'Sports',
    cat_esportivas_desc: 'Sports activities',
    cat_culturais: 'Cultural',
    cat_culturais_desc: 'Cultural activities',
    cat_vazia_erro: 'There are no questions registered in this category yet!',

    // --- Perguntas (Game) ---
    perg_titulo: 'UTFPR Quiz',
    perg_contador: 'QUESTION',
    perg_vazio: 'No questions found for this category.',

    // --- Resultado ---
    res_titulo: 'Your Performance',
    res_subtitulo: 'Congratulations on completing the quiz! Here is a summary of how you did',
    res_pontuacao: 'SCORE',
    res_certas: 'Correct',
    res_erradas: 'Wrong',
    res_btn_novamente: 'Play Again',
    res_btn_outro: 'Play another quiz',

    // --- Admin (Same as before) ---
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
    banco_titulo: 'Question Bank',
    btn_adicionar: 'Add Question',
    placeholder_busca: 'Search questions...',
    todas_categorias: 'All Categories',
    tab_pergunta: 'Question',
    tab_categoria: 'Category',
    tab_acoes: 'Actions',
    msg_vazio: 'No questions found.',
    msg_carregando: 'Loading questions...',
    msg_confirmar_exclusao: 'Are you sure you want to delete question ID',
    form_titulo_criar: 'Create New Question',
    form_titulo_editar: 'Edit Question',
    form_btn_salvar_criar: 'Save Question',
    form_btn_salvar_editar: 'Save Changes',
    label_texto: 'Question Text',
    placeholder_texto: 'Type the question here...',
    label_opcoes: 'Answer Options',
    label_opcoes_sub: '(Click the radio button to mark the correct one)',
    placeholder_opcao: 'Option',
    label_categoria: 'Category',
    alert_sucesso_criar: 'Question created successfully!',
    alert_sucesso_editar: 'Question updated successfully!',
    alert_sucesso_excluir: 'Question deleted!',
    alert_erro_texto: 'Please write the question text.',
    alert_erro_opcoes: 'Please fill in all 4 options.',
    alert_erro_correta: 'Please select the correct alternative.',
    alert_erro_generico: 'An error occurred.',
  }
};

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [tema, setTema] = useState('Escuro');
  const [idioma, setIdioma] = useState('pt-BR');

  useEffect(() => {
    const root = window.document.documentElement;
    if (tema === 'Escuro') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [tema]);

  const t = (chave) => {
    return traducoes[idioma][chave] || chave;
  };

  // Função limpa sem alerts
  const salvarConfiguracoes = (novoTema, novoIdioma) => {
    setTema(novoTema);
    setIdioma(novoIdioma);
    // alert removido aqui
  };

  return (
    <QuizContext.Provider value={{ tema, idioma, t, salvarConfiguracoes }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);