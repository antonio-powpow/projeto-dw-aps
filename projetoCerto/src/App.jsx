import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Categorias from "./Categoria";
import Perguntas from "./Perguntas.jsx";
import Resultado from "./Resultado.jsx";
import CriarQuiz from "./CriarQuiz.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/categoria" element={<Categorias />} />
      <Route path="/pergunta" element={<Perguntas />} />
      <Route path="/resultado" element={<Resultado />} />
      <Route path="/criarquiz" element={<CriarQuiz />} />
    </Routes>
  );
}

export default App;
