import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Categoria() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  function pergunta() {
    navigate("/pergunta");
  }

  function login() {
    navigate("/");
  }

  function usuario(){
    navigate("/usuario");
  }

  const baseCard =
    "flex flex-1 flex-col gap-4 rounded-lg border p-6 transition-all cursor-pointer bg-white/5 dark:bg-gray-800/40 backdrop-blur-sm focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 dark:focus-within:ring-offset-background-dark";
  const normalBorder =
    "border-white/5 hover:border-primary/50 hover:shadow-lg";
  const selectedBorder = "border-primary shadow-lg ring-2 ring-primary/60";

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
                  className="w-full h-auto"
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
          <div className="flex flex-col items-center gap-10 w-full">
            <div className="flex flex-col items-center gap-2">
              <h1 className="tracking-tight text-4xl sm:text-5xl font-bold leading-tight text-center">
                Escolha uma categoria
              </h1>
              <p className="text-gray-300 text-base font-normal leading-normal text-center max-w-md">
                Teste seus conhecimentos sobre as diferentes atividades que
                fazem parte da Gincana!
              </p>
            </div>

            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-4">
              {/* Filantrópicas */}
              <button
                type="button"
                onClick={() => setSelected("filantropicas")}
                className={`${baseCard} ${selected === "filantropicas" ? selectedBorder : normalBorder
                  }`}
              >
                <div className="text-orange-400">
                  <span className="material-symbols-outlined text-4xl">
                    volunteer_activism
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h2 className="text-lg font-bold leading-tight">
                    Filantrópicas
                  </h2>
                  <p className="text-gray-300 text-sm font-normal leading-normal">
                    Atividades de caridade
                  </p>
                </div>
              </button>

              {/* Recreativas */}
              <button
                type="button"
                onClick={() => setSelected("recreativas")}
                className={`${baseCard} ${selected === "recreativas" ? selectedBorder : normalBorder
                  }`}
              >
                <div className="text-teal-400">
                  <span className="material-symbols-outlined text-4xl">
                    toys
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h2 className="text-lg font-bold leading-tight">
                    Recreativas
                  </h2>
                  <p className="text-gray-300 text-sm font-normal leading-normal">
                    Atividades de lazer
                  </p>
                </div>
              </button>

              {/* Esportivas */}
              <button
                type="button"
                onClick={() => setSelected("esportivas")}
                className={`${baseCard} ${selected === "esportivas" ? selectedBorder : normalBorder
                  }`}
              >
                <div className="text-red-400">
                  <span className="material-symbols-outlined text-4xl">
                    trophy
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h2 className="text-lg font-bold leading-tight">
                    Esportivas
                  </h2>
                  <p className="text-gray-300 text-sm font-normal leading-normal">
                    Atividades esportivas
                  </p>
                </div>
              </button>

              {/* Culturais */}
              <button
                type="button"
                onClick={() => setSelected("culturais")}
                className={`${baseCard} ${selected === "culturais" ? selectedBorder : normalBorder
                  }`}
              >
                <div className="text-indigo-400">
                  <span className="material-symbols-outlined text-4xl">
                    theater_comedy
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h2 className="text-lg font-bold leading-tight">
                    Culturais
                  </h2>
                  <p className="text-gray-300 text-sm font-normal leading-normal">
                    Atividades culturais
                  </p>
                </div>
              </button>
            </div>

            <div className="flex justify-center px-4 py-3">
              <button
                onClick={pergunta}
                className="flex min-w-[84px] max-w-[480px] w-56 cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#020617]"
              >
                <span className="truncate">Iniciar quiz</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
