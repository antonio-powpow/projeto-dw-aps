export default function AdminQuiz() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display">
      <div className="relative flex min-h-screen w-full">
        {/* Sidebar */}
        <aside className="flex-shrink-0 w-64 bg-background-light dark:bg-[#101622] border-r border-slate-200 dark:border-slate-800">
          <div className="flex h-full flex-col justify-between p-4">
            <div className="flex flex-col gap-4">

              {/* Perfil */}
              <div className="flex items-center gap-3 px-2">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYl88DHFTsD2DzHPJoTVUhVQeFulfB_AepR0dK6dA7-OH9dzp3EbDFGKSFYKlIB2ZCtXow0WVw4X5RsYyQC_0HGciAGYtRADOmi75u8_Kb2mDCglJyGtBg8wvBJH43GRUjPzYx30gfMsZ8MPX5KWoCrTQZFrO49VP28I1HVjNgEcMEicAdHYFgsAyiB4-j5J0lpPUORTfBkqcVcq_9fP9ety3Hv5VzQWoWjpHAIuPbf7d6_KA9DoxNxz8FkjC7AacIhxTAE3wwdN55")',
                  }}
                ></div>

                <div className="flex flex-col">
                  <h1 className="text-slate-900 dark:text-white text-base font-medium leading-normal">
                    Admin
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                    Quiz Manager
                  </p>
                </div>
              </div>

              {/* Nav */}
              <nav className="flex flex-col gap-2 mt-4">
                <a className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-primary px-4 text-white text-sm font-medium hover:bg-primary/90" href="#">
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                    play_circle
                  </span>
                  <span>Jogar</span>
                </a>

                <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20" href="#">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    quiz
                  </span>
                  <p className="text-sm font-medium leading-normal">Quizzes</p>
                </a>

                <a className="flex items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" href="#">
                  <span className="material-symbols-outlined">database</span>
                  <p className="text-sm font-medium leading-normal">Banco de Perguntas</p>
                </a>

                <a className="flex items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" href="#">
                  <span className="material-symbols-outlined">settings</span>
                  <p className="text-sm font-medium leading-normal">Configurações</p>
                </a>
              </nav>
            </div>

            <div className="flex flex-col gap-1">
              <a className="flex items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" href="#">
                <span className="material-symbols-outlined">logout</span>
                <p className="text-sm font-medium leading-normal">Sair</p>
              </a>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col p-6 lg:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-wrap justify-between gap-4 items-center mb-6">
              <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">
                Adicionando Perguntas a: Gincana 2024 - Quiz 1
              </h1>

              <div className="flex gap-3">
                <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-slate-200 dark:bg-slate-800 px-4 text-slate-700 dark:text-slate-300 text-sm font-medium">
                  Cancelar
                </button>

                <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-primary px-4 text-white text-sm font-medium">
                  Salvar Quiz
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Banco de perguntas */}
              <div className="lg:col-span-3 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-grow">
                    <label className="flex flex-col min-w-40 w-full h-11">
                      <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                        <div className="text-slate-400 dark:text-slate-500 flex bg-slate-100 dark:bg-slate-800 items-center justify-center pl-3 rounded-l-lg">
                          <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                          className="form-input flex w-full flex-1 resize-none rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-slate-100 dark:bg-slate-800 h-full placeholder:text-slate-400 dark:placeholder:text-slate-500 px-4 rounded-l-none text-sm"
                          placeholder="Buscar perguntas..."
                        />
                      </div>
                    </label>
                  </div>

                  <div className="flex-shrink-0">
                    <button className="flex h-11 w-full md:w-auto items-center justify-center gap-x-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20 pl-4 pr-3 text-slate-900 dark:text-white">
                      <p className="text-sm font-medium text-primary dark:text-primary">
                        Sobre UTFPR
                      </p>
                      <span className="material-symbols-outlined text-slate-400 dark:text-slate-500" style={{ fontSize: 20 }}>
                        expand_more
                      </span>
                    </button>
                  </div>
                </div>

                {/* Título */}
                <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight pt-2">
                  Banco de Perguntas
                </h2>

                {/* Lista de perguntas */}
                <div className="flex flex-col gap-3">
                  {/* Pergunta 1 */}
                  <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex justify-between items-center">
                    <div className="flex flex-col">
                      <p className="text-slate-900 dark:text-white font-medium">
                        What year was UTFPR founded as a Federal University?
                      </p>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-full mt-2 self-start">
                        Sobre UTFPR
                      </span>
                    </div>

                    <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-500">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>

                  {/* Pergunta 2 (já adicionada) */}
                  <div className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 flex justify-between items-center opacity-60">
                    <div className="flex flex-col">
                      <p className="text-slate-500 dark:text-slate-400 font-medium">
                        Who discovered the principle of relativity?
                      </p>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded-full mt-2 self-start">
                        Ciência
                      </span>
                    </div>

                    <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed">
                      <span className="material-symbols-outlined">check</span>
                    </button>
                  </div>

                  {/* Pergunta 3 */}
                  <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex justify-between items-center">
                    <div className="flex flex-col">
                      <p className="text-slate-900 dark:text-white font-medium">
                        In which city is the main campus of UTFPR located?
                      </p>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-full mt-2 self-start">
                        Sobre UTFPR
                      </span>
                    </div>

                    <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-500">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>

                  {/* Pergunta 4 */}
                  <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex justify-between items-center">
                    <div className="flex flex-col">
                      <p className="text-slate-900 dark:text-white font-medium">
                        What is the chemical symbol for gold?
                      </p>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-full mt-2 self-start">
                        Ciência
                      </span>
                    </div>

                    <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-500">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>

                  {/* Pergunta 5 */}
                  <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex justify-between items-center">
                    <div className="flex flex-col">
                      <p className="text-slate-900 dark:text-white font-medium">
                        Who was the first president of Brazil?
                      </p>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/50 px-2 py-1 rounded-full mt-2 self-start">
                        História
                      </span>
                    </div>

                    <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-500">
                      <span className="material-symbols-outlined">add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Perguntas selecionadas */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sticky top-8">
                  <h3 className="text-slate-900 dark:text-white text-lg font-bold">
                    Perguntas Selecionadas (2)
                  </h3>

                  <div className="mt-4 flex flex-col gap-2">
                    <div className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                      <p className="text-slate-700 dark:text-slate-300 text-sm truncate pr-2">
                        Who discovered the principle of relativity?
                      </p>

                      <button className="flex h-7 w-7 items-center justify-center rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-500">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                          delete
                        </span>
                      </button>
                    </div>

                    <div className="bg-slate-100 dark:bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                      <p className="text-slate-700 dark:text-slate-300 text-sm truncate pr-2">
                        What is the largest planet in our solar system?
                      </p>

                      <button className="flex h-7 w-7 items-center justify-center rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-500">
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
