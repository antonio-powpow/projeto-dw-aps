import { useState } from "react";

export default function Categoria() {
  const [selected, setSelected] = useState(null);

  const baseCard =
    "flex flex-1 flex-col gap-4 rounded-lg border p-6 transition-all cursor-pointer bg-white dark:bg-gray-800/20 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 dark:focus-within:ring-offset-background-dark";
  const normalBorder = "border-gray-200 dark:border-white/10 hover:border-primary/50 hover:shadow-lg";
  const selectedBorder = "border-primary shadow-lg ring-2 ring-primary/60";

  return (
    <div className="bg-background-light dark:bg-background-dark font-display">
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-x-hidden p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-5xl">
          <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200/80 dark:border-white/10 px-6 sm:px-10 py-4">
            <div className="flex items-center gap-4 text-gray-800 dark:text-white">
              <div className="size-6 text-primary">
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                Gincana da UTFPR
              </h2>
            </div>

            <div className="hidden sm:flex items-center gap-9">
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-white"
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
              <h1 className="text-gray-900 dark:text-white tracking-tight text-4xl sm:text-5xl font-bold leading-tight text-center">
                Escolha uma Categoria
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal text-center max-w-md">
                Teste seus conhecimentos sobre as diferentes atividades que
                fazem parte da Gincana!
              </p>
            </div>

            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-4">
              {/* Filantrópicas */}
              <button
                type="button"
                onClick={() => setSelected("filantropicas")}
                className={`${baseCard} ${
                  selected === "filantropicas" ? selectedBorder : normalBorder
                }`}
              >
                <div className="text-orange-500">
                  <span className="material-symbols-outlined text-4xl">
                    volunteer_activism
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                    Filantrópicas
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                    Atividades de caridade
                  </p>
                </div>
              </button>

              {/* Recreativas */}
              <button
                type="button"
                onClick={() => setSelected("recreativas")}
                className={`${baseCard} ${
                  selected === "recreativas" ? selectedBorder : normalBorder
                }`}
              >
                <div className="text-teal-500">
                  <span className="material-symbols-outlined text-4xl">
                    toys
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                    Recreativas
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                    Atividades de lazer
                  </p>
                </div>
              </button>

              {/* Esportivas */}
              <button
                type="button"
                onClick={() => setSelected("esportivas")}
                className={`${baseCard} ${
                  selected === "esportivas" ? selectedBorder : normalBorder
                }`}
              >
                <div className="text-red-500">
                  <span className="material-symbols-outlined text-4xl">
                    trophy
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                    Esportivas
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                    Atividades esportivas
                  </p>
                </div>
              </button>

              {/* Culturais */}
              <button
                type="button"
                onClick={() => setSelected("culturais")}
                className={`${baseCard} ${
                  selected === "culturais" ? selectedBorder : normalBorder
                }`}
              >
                <div className="text-indigo-500">
                  <span className="material-symbols-outlined text-4xl">
                    theater_comedy
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-left">
                  <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight">
                    Culturais
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                    Atividades culturais
                  </p>
                </div>
              </button>
            </div>

            <div className="flex justify-center px-4 py-3">
              <button className="flex min-w-[84px] max-w-[480px] w-56 cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] transition-all hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark">
                <span className="truncate">Escolher Quiz</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
