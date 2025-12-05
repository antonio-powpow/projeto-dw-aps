import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";
import Categorias from "./Categoria";
import Perguntas from "./Perguntas.jsx";
import Resultado from "./Resultado.jsx";
import CriarQuiz from "./CriarQuiz.jsx";

import TelaGerenciadorQuiz from "./componetesTela/TelaGerenciadorQuiz.jsx";

function App() {
  return (<TelaGerenciadorQuiz/>
    //<Routes>
    //<Route path="/" element={<Login />} />
    //  <Route path="/cadastro" element={<Cadastro />} />
    //  <Route path="/categorias" element={<Categorias />} />
    //  <Route path="/perguntas" element={<Perguntas />} />
    //  <Route path="/resultado" element={<Resultado />} />
    //</Routes>
  );
}

export default App;
