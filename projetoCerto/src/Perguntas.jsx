// Pergunta.jsx
import { useNavigate } from "react-router-dom";

export default function Pergunta() {
  const navigate = useNavigate();

  function resultado() {
        navigate("/resultado");
      }
      function login(){
        navigate("/");
      }

      function usuario(){
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
              className="size-14 text-primary">
                <span className="w-full md:w-1/4 lg:w-1/4 h-auto" ><img
                  src="/quiz.png"
                  alt="Quiz UTFPR"
                /></span>
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                Quiz UTFPR
              </h2>
            </div>

            <div
            onClick={usuario}
            className="hidden sm:flex items-center gap-9">
              <a
                href="#"
                className="text-gray-300 hover:text-primary"
              >
                <span className="material-symbols-outlined text-2xl">
                  account_circle
                </span>
              </a>
            </div>
          </header>
        </div>

        <main className="flex flex-1 flex-col items-center justify-center w-full max-w-5xl py-12 sm:py-16 md:py-20">
          <div className="flex flex-col items-center gap-10 w-full max-w-2xl">
            {/* Texto superior */}
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="rounded-full bg-primary/20 px-4 py-1.5">
                <p className="text-sm font-bold text-primary">CATEGORIA</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-primary text-base font-bold leading-normal">
                  PERGUNTA 1/10
                </p>
                <h1 className="tracking-tight text-3xl sm:text-4xl font-bold leading-tight">
                  PERGUNTA
                </h1>
              </div>
            </div>

            {/* Alternativas */}
            <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 p-4">
              {["A", "B", "C", "D"].map((letra) => (
                <button
                  key={letra}
                  className="flex items-center text-left flex-1 gap-4 rounded-lg border border-white/10 bg-white/5 dark:bg-gray-800/40 backdrop-blur-sm p-5 transition-all hover:border-primary/50 hover:shadow-lg focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-[#020617]"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md border border-gray-500 bg-gray-900/60 text-sm font-bold text-gray-100">
                    {letra}
                  </div>
                  <span className="flex-1 text-gray-100 font-medium">
                    RESPOSTA
                  </span>
                </button>
              ))}
            </div>

            {/* Botão responder */}
            <div className="flex justify-center px-4 py-3">
              <button
                onClick={resultado}
                className="flex min-w-[84px] max-w-[480px] w-56 cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#020617] disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-700 dark:disabled:text-gray-500"
              >
                <span className="truncate">Responder</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
