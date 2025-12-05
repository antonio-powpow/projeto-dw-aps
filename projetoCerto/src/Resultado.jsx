// DesempenhoNovo.jsx
export default function Resultado() {
  return (
    <div className="min-h-screen w-full bg-[#020617] text-white font-display">
      {/* Container geral */}
      <div className="flex flex-col min-h-screen px-4 sm:px-8 py-6">
        {/* Header */}
        <header className="flex items-center justify-between w-full max-w-5xl mx-auto py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-xs font-extrabold tracking-tight">
                G
              </span>
            </div>
            <span className="font-semibold text-sm sm:text-base">
              Gincana UTFPR
            </span>
          </div>

          <button className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-slate-200 hover:bg-white/10">
            <span className="material-symbols-outlined text-2xl">account_circle</span>
          </button>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1 flex flex-col items-center justify-center w-full">
          <section className="w-full max-w-4xl flex flex-col items-center gap-10">
            {/* Título */}
            <div className="text-center space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
                Seu Desempenho
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
                Parabéns por concluir o quiz! Aqui está um resumo de como você se
                saiu nas perguntas sobre a Gincana da UTFPR.
              </p>
            </div>

            {/* Card de resultado */}
            <div className="w-full max-w-3xl rounded-3xl bg-[#020617] border border-white/5 shadow-[0_40px_120px_rgba(15,23,42,0.9)] px-8 py-10 flex flex-col items-center">
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
                {/* Círculo de pontuação */}
                <div className="relative w-56 h-56">
                  <div className="absolute inset-0 rounded-full border-[10px] border-green-500 border-t-red-500 border-r-green-500 border-b-green-500" />
                  <div className="absolute inset-6 rounded-full bg-[#020617] flex flex-col items-center justify-center text-center">
                    <span className="text-xs font-semibold text-slate-400 mb-1">
                      PONTUAÇÃO
                    </span>
                    <span className="text-6xl font-extrabold text-blue-500">
                      80
                    </span>
                  </div>
                </div>

                {/* Certas e erradas */}
                <div className="flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <span className="material-symbols-outlined text-2xl">
                        check
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">8</span>
                      <span className="text-xs text-slate-400">Certas</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                      <span className="material-symbols-outlined text-2xl">
                        close
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-semibold">2</span>
                      <span className="text-xs text-slate-400">Erradas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
              <button className="flex-1 h-11 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-semibold shadow-md">
                Jogar Novamente
              </button>
              <button className="flex-1 h-11 rounded-full bg-[#111827] text-sm font-semibold text-slate-100 hover:bg-[#1f2937]">
                Jogar outro quiz
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
