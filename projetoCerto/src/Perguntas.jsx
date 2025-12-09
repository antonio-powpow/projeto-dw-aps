import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Perguntas() {
  const navigate = useNavigate();
  const location = useLocation();
  const perguntasRecebidas = location.state?.perguntas || [];
  const categoria = location.state?.categoria || "";
  const perguntas = perguntasRecebidas.filter((p) => Array.isArray(p.opcoes) && p.opcoes.length >= 4);

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [indiceSelecionado, setIndiceSelecionado] = useState(null);
  const [respondida, setRespondida] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [respostasJogador, setRespostasJogador] = useState([]);
  const [animating, setAnimating] = useState(false);

  const perguntaAtual = perguntas[indiceAtual];

  if (!perguntaAtual) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617] text-gray-900 dark:text-white"><p>Nenhuma pergunta encontrada.</p></div>;

  function handleResposta(indexOpcao) {
    if (respondida) return;
    setIndiceSelecionado(indexOpcao);
    setRespondida(true);
    const correta = indexOpcao === perguntaAtual.respostaCorreta;
    setRespostasJogador((prev) => [...prev, {
        indicePergunta: indiceAtual, pergunta: perguntaAtual.pergunta, categoria: perguntaAtual.categoria,
        opcoes: perguntaAtual.opcoes, respostaCorreta: perguntaAtual.respostaCorreta, respostaJogador: indexOpcao, acertou: correta,
    }]);
    if (correta) setAcertos((prev) => prev + 1);
  }

  function irParaResultado() {
    const desempenho = { categoria, totalPerguntas: perguntas.length, acertos, erros: perguntas.length - acertos, respostas: respostasJogador };
    navigate("/resultado", { state: { desempenho } });
  }

  function proximaPergunta() {
    const ultima = indiceAtual === perguntas.length - 1;
    if (ultima) irParaResultado();
    else { setIndiceAtual((prev) => prev + 1); setIndiceSelecionado(null); setRespondida(false); }
  }

  useEffect(() => {
    if (!respondida) return;
    const timerCorrigir = setTimeout(() => {
      setAnimating(true);
      const timerAnim = setTimeout(() => { setAnimating(false); proximaPergunta(); }, 300);
      return () => clearTimeout(timerAnim);
    }, 500);
    return () => clearTimeout(timerCorrigir);
  }, [respondida]);

  function getClassesOpcao(indexOpcao) {
    const base = "flex items-center text-left flex-1 gap-4 rounded-lg border p-5 transition-all backdrop-blur-sm ";
    // Estilos dinâmicos Claro/Escuro
    if (!respondida) return base + "border-gray-300 bg-white hover:border-primary/50 hover:shadow-lg cursor-pointer dark:border-white/10 dark:bg-white/5";
    const correta = indexOpcao === perguntaAtual.respostaCorreta;
    const clicadaErrada = indiceSelecionado === indexOpcao && indexOpcao !== perguntaAtual.respostaCorreta;
    if (correta) return base + "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500 cursor-default dark:bg-emerald-500/10";
    if (clicadaErrada) return base + "border-red-500 bg-red-50 ring-2 ring-red-500 cursor-default dark:bg-red-500/10";
    return base + "border-gray-200 bg-gray-50 opacity-60 cursor-default dark:border-white/10 dark:bg-white/5";
  }

  function getIcone(indexOpcao) {
    if (!respondida) return null;
    const correta = indexOpcao === perguntaAtual.respostaCorreta;
    const clicadaErrada = indiceSelecionado === indexOpcao && indexOpcao !== perguntaAtual.respostaCorreta;
    if (correta) return <span className="material-symbols-outlined text-2xl text-emerald-500 dark:text-emerald-400">check</span>;
    if (clicadaErrada) return <span className="material-symbols-outlined text-2xl text-red-500 dark:text-red-400">close</span>;
    return null;
  }

  const letraOpcao = (i) => String.fromCharCode(65 + i);
  function login() { navigate("/"); }
  function usuario() { navigate("/usuario"); }
  const cardAnimClass = animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0";

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#020617] font-display text-gray-900 dark:text-white transition-colors duration-300">
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden p-4 sm:p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white to-slate-100 dark:from-[#020617] dark:to-[#020617]">
          <div className="absolute inset-x-0 top-40 mx-auto h-[420px] w-[720px] rounded-[999px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_60%)] opacity-70 blur-3xl hidden dark:block" />
        </div>

        <div className="w-full max-w-5xl">
          <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-white/10 px-6 sm:px-10 py-4">
            <div className="flex items-center gap-4">
              <div onClick={login} className="size-14 text-primary cursor-pointer"><img src="/quiz.png" alt="Quiz UTFPR" className="w-full h-auto" /></div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Quiz UTFPR</h2>
            </div>
            <div onClick={usuario} className="hidden sm:flex items-center gap-9 cursor-pointer">
              <span className="text-gray-400 hover:text-primary"><span className="material-symbols-outlined text-2xl">account_circle</span></span>
            </div>
          </header>
        </div>

        <main className="flex flex-1 flex-col items-center justify-center w-full max-w-5xl">
          <div className={`flex flex-col items-center gap-8 w-full max-w-2xl transform transition-all duration-300 ease-out ${cardAnimClass}`}>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-primary/10 dark:bg-primary/20 px-4 py-1.5">
                <p className="text-sm font-bold text-primary">{categoria.toUpperCase() || "CATEGORIA"}</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-primary text-base font-bold leading-normal">PERGUNTA {indiceAtual + 1}/{perguntas.length}</p>
                <h1 className="tracking-tight text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">{perguntaAtual.pergunta}</h1>
              </div>
            </div>

            <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-4 p-2">
              {perguntaAtual.opcoes.slice(0, 4).map((opcao, index) => (
                <button key={index} type="button" onClick={() => handleResposta(index)} className={getClassesOpcao(index)} disabled={respondida}>
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-gray-700 dark:border-gray-500 dark:bg-gray-900/60 dark:text-gray-100 text-sm font-bold">
                    {letraOpcao(index)}
                  </div>
                  <span className="flex-1 font-medium">{opcao}</span>
                  {getIcone(index)}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}