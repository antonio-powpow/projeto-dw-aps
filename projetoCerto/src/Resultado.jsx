import { useLocation, useNavigate } from "react-router-dom";

export default function Resultado() {
  const navigate = useNavigate();
  const location = useLocation();

  const desempenho = location.state?.desempenho;

  const total = desempenho?.totalPerguntas || 0;
  const acertos = desempenho?.acertos || 0;
  const erros = desempenho?.erros || 0;
  const categoria = desempenho?.categoria || "";
  const pontuacao = total ? Math.round((acertos / total) * 100) : 0;

  const greenPortion = Math.min(pontuacao, 100);
  const progressStyle = {
    background: `conic-gradient(
      #22c55e 0deg,
      #22c55e ${(greenPortion / 100) * 360}deg,
      #ef4444 ${(greenPortion / 100) * 360}deg,
      #ef4444 360deg
    )`,
  };

  function outroQuiz() {
    navigate("/categoria");
  }

  function jogarNovamente() {
    if (!desempenho) {
      navigate("/categoria");
      return;
    }

    const perguntasNovamente =
      desempenho.respostas?.map((r) => ({
        pergunta: r.pergunta,
        categoria: r.categoria,
        opcoes: r.opcoes,
        respostaCorreta: r.respostaCorreta,
      })) || [];

    navigate("/pergunta", {
      state: {
        perguntas: perguntasNovamente,
        categoria,
      },
    });
  }

  function login() {
    navigate("/");
  }

  function usuario() {
    navigate("/usuario");
  }

  return (
    <div className="min-h-screen w-full bg-[#020617] font-display text-white">
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden px-4 sm:px-8 py-6">
        {/* Fundo com glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#020617] to-[#020617]">
          <div className="absolute inset-x-0 top-40 mx-auto h-[480px] w-[800px] rounded-[999px] bg-[radial-gradient(circle_at_top,_rgba(37,99,235,0.45),_transparent_60%)] opacity-80 blur-3xl" />
        </div>

        {/* Header */}
        <header className="w-full max-w-6xl flex items-center justify-between whitespace-nowrap py-2 mb-6 border-b border-white/10">
          <div className="flex items-center gap-3 text-white">
            <div
              onClick={login}
              className="w-10 h-10 md:w-14 md:h-14 cursor-pointer"
            >
              <img
                src="/quiz.png"
                alt="Quiz UTFPR"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-sm sm:text-base font-semibold">
              Quiz UTFPR
            </span>
          </div>

          <button
            onClick={usuario}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-slate-200 hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-2xl">
              account_circle
            </span>
          </button>
        </header>

        {/* Conteúdo central */}
        <main className="flex-1 flex flex-col items-center justify-center w-full">
          <section className="w-full max-w-4xl flex flex-col items-center gap-10">
            {/* Título */}
            <div className="text-center space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
                Seu Desempenho
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Parabéns por concluir o quiz! Aqui está um resumo de como você
                se saiu{categoria && ` na categoria ${categoria}`}.
              </p>
            </div>

            {/* Card central “flutuando” */}
            <div
              className="w-full max-w-3xl rounded-3xl bg-[#020617]/80 border border-white/5 shadow-[0_30px_100px_rgba(15,23,42,0.9)] px-6 sm:px-10 py-8 flex items-center justify-center transition-transform duration-700 ease-in-out"
              style={{
                animation:
                  "floatCard 4s ease-in-out infinite",
              }}
            >
              <style>
                {`
                  @keyframes floatCard {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-6px); }
                    100% { transform: translateY(0px); }
                  }
                `}
              </style>

              <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
                {/* Círculo funcional */}
                <div className="relative w-52 h-52 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={progressStyle}
                  />
                  <div className="absolute inset-5 rounded-full bg-[#020617] flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-semibold text-slate-400 mb-1">
                      PONTUAÇÃO
                    </span>
                    <span className="text-5xl font-extrabold text-blue-500">
                      {pontuacao}
                    </span>
                  </div>
                </div>

                {/* Certas / Erradas */}
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <span className="material-symbols-outlined text-2xl">
                        check
                      </span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-semibold">{acertos}</span>
                      <span className="text-xs text-slate-400">Certas</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                      <span className="material-symbols-outlined text-2xl">
                        close
                      </span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-semibold">{erros}</span>
                      <span className="text-xs text-slate-400">Erradas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
              <button
                onClick={jogarNovamente}
                className="flex-1 h-11 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-semibold shadow-md"
              >
                Jogar Novamente
              </button>
              <button
                onClick={outroQuiz}
                className="flex-1 h-11 rounded-full bg-[#111827] text-sm font-semibold text-slate-100 hover:bg-[#1f2937]"
              >
                Jogar outro quiz
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
