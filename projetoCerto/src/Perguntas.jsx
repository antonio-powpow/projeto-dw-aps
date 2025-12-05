import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Perguntas() {
  const navigate = useNavigate();
  const location = useLocation();

  const perguntasRecebidas = location.state?.perguntas || [];
  const categoria = location.state?.categoria || "";

  const perguntas = perguntasRecebidas.filter(
    (p) => Array.isArray(p.opcoes) && p.opcoes.length >= 4
  );

  const [indiceAtual, setIndiceAtual] = useState(0);
  const [indiceSelecionado, setIndiceSelecionado] = useState(null);
  const [respondida, setRespondida] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [respostasJogador, setRespostasJogador] = useState([]);

  const perguntaAtual = perguntas[indiceAtual];

  if (!perguntaAtual) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white">
        <p>Nenhuma pergunta encontrada para esta categoria.</p>
      </div>
    );
  }

  function handleResposta(indexOpcao) {
    if (respondida) return;

    setIndiceSelecionado(indexOpcao);
    setRespondida(true);

    const correta = indexOpcao === perguntaAtual.respostaCorreta;

    setRespostasJogador((prev) => [
      ...prev,
      {
        indicePergunta: indiceAtual,
        pergunta: perguntaAtual.pergunta,
        categoria: perguntaAtual.categoria,
        opcoes: perguntaAtual.opcoes,
        respostaCorreta: perguntaAtual.respostaCorreta,
        respostaJogador: indexOpcao,
        acertou: correta,
      },
    ]);

    if (correta) {
      setAcertos((prev) => prev + 1);
    }
  }

  function proximaOuResultado() {
    const ultima = indiceAtual === perguntas.length - 1;

    if (ultima) {
      const desempenho = {
        categoria,
        totalPerguntas: perguntas.length,
        acertos,
        erros: perguntas.length - acertos,
        respostas: respostasJogador,
      };

      navigate("/resultado", { state: { desempenho } });
    } else {
      setIndiceAtual((prev) => prev + 1);
      setIndiceSelecionado(null);
      setRespondida(false);
    }
  }

  function getClassesOpcao(indexOpcao) {
    const base =
      "flex items-center text-left flex-1 gap-4 rounded-lg border p-5 transition-all backdrop-blur-sm ";

    if (!respondida) {
      return (
        base +
        "border-white/10 bg-white/5 hover:border-primary/50 hover:shadow-lg cursor-pointer"
      );
    }

    const correta = indexOpcao === perguntaAtual.respostaCorreta;
    const clicadaErrada =
      indiceSelecionado === indexOpcao &&
      indexOpcao !== perguntaAtual.respostaCorreta;

    if (correta) {
      return (
        base +
        "border-emerald-500 bg-emerald-500/10 ring-2 ring-emerald-500 cursor-default"
      );
    }

    if (clicadaErrada) {
      return (
        base +
        "border-red-500 bg-red-500/10 ring-2 ring-red-500 cursor-default"
      );
    }

    return base + "border-white/10 bg-white/5 opacity-60 cursor-default";
  }

  function getIcone(indexOpcao) {
    if (!respondida) return null;

    const correta = indexOpcao === perguntaAtual.respostaCorreta;
    const clicadaErrada =
      indiceSelecionado === indexOpcao &&
      indexOpcao !== perguntaAtual.respostaCorreta;

    if (correta) {
      return (
        <span className="material-symbols-outlined text-2xl text-emerald-400">
          check
        </span>
      );
    }

    if (clicadaErrada) {
      return (
        <span className="material-symbols-outlined text-2xl text-red-400">
          close
        </span>
      );
    }

    return null;
  }

  const letraOpcao = (i) => String.fromCharCode(65 + i); // A,B,C,D

  function login() {
    navigate("/");
  }

  function usuario() {
    navigate("/usuario");
  }

  return (
    <div className="min-h-screen w-full bg-[#020617] font-display text-white">
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden p-4 sm:p-6 md:p-8">
        {/* FUNDO COM GLOW */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#020617] to-[#020617]">
          <div className="absolute inset-x-0 top-40 mx-auto h-[420px] w-[720px] rounded-[999px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_60%)] opacity-70 blur-3xl" />
        </div>

        <div className="w-full max-w-5xl">
          <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200/80 dark:border-white/10 px-6 sm:px-10 py-4">
            <div className="flex items-center gap-4 text-gray-800 dark:text-white">
              <div
                onClick={login}
                className="size-14 text-primary cursor-pointer"
              >
                <span className="w-full md:w-1/4 lg:w-1/4 h-auto">
                  <img
                    src="/quiz.png"
                    alt="Quiz UTFPR"
                    className="w-full h-auto"
                  />
                </span>
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                Quiz UTFPR
              </h2>
            </div>

            <div
              onClick={usuario}
              className="hidden sm:flex items-center gap-9 cursor-pointer"
            >
              <span className="text-gray-300 hover:text-primary">
                <span className="material-symbols-outlined text-2xl">
                  account_circle
                </span>
              </span>
            </div>
          </header>
        </div>

        <main className="flex flex-1 flex-col items-center justify-center w-full max-w-5xl py-12 sm:py-16 md:py-20">
          <div className="flex flex-col items-center gap-10 w-full max-w-2xl">
            {/* Texto superior */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-primary/20 px-4 py-1.5">
                <p className="text-sm font-bold text-primary">
                  {categoria.toUpperCase() || "CATEGORIA"}
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-primary text-base font-bold leading-normal">
                  PERGUNTA {indiceAtual + 1}/{perguntas.length}
                </p>
                <h1 className="tracking-tight text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                  {perguntaAtual.pergunta}
                </h1>
              </div>
            </div>

            {/* Alternativas */}
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 p-4">
              {perguntaAtual.opcoes.slice(0, 4).map((opcao, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleResposta(index)}
                  className={getClassesOpcao(index)}
                  disabled={respondida}
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-gray-500 bg-gray-900/60 text-sm font-bold text-gray-100">
                    {letraOpcao(index)}
                  </div>
                  <span className="flex-1 text-gray-100 font-medium">
                    {opcao}
                  </span>
                  {getIcone(index)}
                </button>
              ))}
            </div>

            {/* Botão Próxima / Finalizar */}
            <div className="flex justify-center px-4 py-3">
              <button
                onClick={proximaOuResultado}
                disabled={!respondida}
                className="flex min-w-[84px] max-w-[480px] w-56 items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] transition-all hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#020617]"
              >
                <span className="truncate">
                  {indiceAtual === perguntas.length - 1
                    ? "Finalizar"
                    : "Próxima pergunta"}
                </span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
