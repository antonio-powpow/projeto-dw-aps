import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Resultado() {
  const navigate = useNavigate();
  const location = useLocation();

  const desempenho = location.state?.desempenho;

  const total = desempenho?.totalPerguntas || 0;
  const acertosFinais = desempenho?.acertos || 0;
  const errosFinais = desempenho?.erros || 0;
  const categoria = desempenho?.categoria || "";
  const pontuacaoFinal = total ? Math.round((acertosFinais / total) * 100) : 0;

  // estados animados
  const [acertosAnim, setAcertosAnim] = useState(0);
  const [errosAnim, setErrosAnim] = useState(0);
  const [pontuacaoAnim, setPontuacaoAnim] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  // fade-in do card ao montar
  useEffect(() => {
    setFadeIn(true);
  }, []);

  // animação dos contadores (certas / erradas)
  useEffect(() => {
    if (!desempenho) return;

    const duracao = 1200; // ms
    const passos = Math.max(acertosFinais + errosFinais, 1);
    const intervalo = duracao / passos;

    let ac = 0;
    let er = 0;

    const timer = setInterval(() => {
      if (ac < acertosFinais) {
        ac += 1;
        setAcertosAnim(ac);
      } else if (er < errosFinais) {
        er += 1;
        setErrosAnim(er);
      } else {
        clearInterval(timer);
      }
    }, intervalo);

    return () => clearInterval(timer);
  }, [desempenho, acertosFinais, errosFinais]);

  // animação suave apenas da pontuação / círculo
  useEffect(() => {
    if (!desempenho) return;

    const duracao = 1200; // ms
    const steps = 60;
    const intervalo = duracao / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      const t = currentStep / steps; // 0 → 1
      const valor = Math.round(pontuacaoFinal * t);
      setPontuacaoAnim(valor >= pontuacaoFinal ? pontuacaoFinal : valor);

      if (currentStep >= steps) {
        setPontuacaoAnim(pontuacaoFinal);
        clearInterval(timer);
      }
    }, intervalo);

    return () => clearInterval(timer);
  }, [desempenho, pontuacaoFinal]);

  const greenPortion = Math.min(pontuacaoAnim, 100);
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

  const cardAnimClass = fadeIn
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-3";

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

            {/* Card central com fade */}
            <div
              className={`w-full max-w-3xl rounded-3xl bg-[#020617]/80 border border-white/5 shadow-[0_30px_100px_rgba(15,23,42,0.9)] px-6 sm:px-10 py-8 flex items-center justify-center transform transition-all duration-500 ease-out ${cardAnimClass}`}
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
                {/* Círculo funcional animado (suave) */}
                <div className="relative w-52 h-52 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full transition-all duration-200"
                    style={progressStyle}
                  />
                  <div className="absolute inset-5 rounded-full bg-[#020617] flex flex-col items-center justify-center text-center">
                    <span className="text-[10px] font-semibold text-slate-400 mb-1">
                      PONTUAÇÃO
                    </span>
                    <span className="text-5xl font-extrabold text-blue-500">
                      {pontuacaoAnim}
                    </span>
                  </div>
                </div>

                {/* Certas / Erradas animadas */}
                <div className="flex flex-col gap-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <span className="material-symbols-outlined text-2xl">
                        check
                      </span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-lg font-semibold">
                        {acertosAnim}
                      </span>
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
                      <span className="text-lg font-semibold">
                        {errosAnim}
                      </span>
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
