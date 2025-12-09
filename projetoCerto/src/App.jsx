import { Routes, Route } from "react-router-dom";
import { QuizProvider } from "./componetesTela/QuizContext"; // Importe o Contexto

import Login from "./Login.jsx";
import Cadastro from "./Cadastro.jsx";
import Categoria from "./Categoria.jsx";
import Perguntas from "./Perguntas.jsx";
import Resultado from "./Resultado.jsx";
import TelaGerenciadorQuiz from "./componetesTela/TelaGerenciadorQuiz.jsx";

function App() {
  return (
    <QuizProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/pergunta" element={<Perguntas />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="/usuario" element={<TelaGerenciadorQuiz />} />
      </Routes>
    </QuizProvider>
  );
}

export default App;