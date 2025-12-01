import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Cadastro from "./Cadastro";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
}

export default App;
