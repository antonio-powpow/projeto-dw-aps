import React from "react";

export default function CriarQuiz() {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display">
      <div className="relative flex min-h-screen w-full">
        {/* Sidebar */}
        <aside className="flex-shrink-0 w-64 bg-background-light dark:bg-[#101622] border-r border-slate-200 dark:border-slate-800">
          <div className="flex h-full flex-col justify-between p-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 px-2">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                  style={{
                    backgroundImage:
                      'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDYl88DHFTsD2DzHPJoTVUhVQeFulfB_AepR0dK6dA7-OH9dzp3EbDFGKSFYKlIB2ZCtXow0WVw4X5RsYyQC_0HGciAGYtRADOmi75u8_Kb2mDCglJyGtBg8wvBJH43GRUjPzYx30gfMsZ8MPX5KWoCrTQZFrO49VP28I1HVjNgEcMEicAdHYFgsAyiB4-j5J0lpPUORTfBkqcVcq_9fP9ety3Hv5VzQWoWjpHAIuPbf7d6_KA9DoxNxz8FkjC7AacIhxTAE3wwdN55")',
                  }}
                ></div>

                <div className="flex flex-col">
                  <h1 className="text-slate-900 dark:text-white text-base font-medium">
                    Admin
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Quiz Manager
                  </p>
                </div>
              </div>

              <nav className="flex flex-col gap-2 mt-4">
                <a className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-primary px-4 text-white text-sm font-medium w-full mb-2 hover:bg-primary/90">
                  <span className="material-symbols-outlined text-[20px]">
                    play_arrow
                  </span>
                  <span>Jogar</span>
                </a>

                <a className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary dark:bg-primary/20">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    quiz
                  </span>
                  <p className="text-sm font-medium">Quizzes</p>
                </a>

                <a className="flex items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  <span className="material-symbols-outlined">database</span>
                  <p className="text-sm font-medium">Question Bank</p>
                </a>

                <a className="flex items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  <span className="material-symbols-outlined">settings</span>
                  <p className="text-sm font-medium">Settings</p>
                </a>
              </nav>
            </div>

            <div className="flex flex-col gap-1">
              <a className="flex items-center gap-3 px-3 py-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <span className="material-symbols-outlined">logout</span>
                <p className="text-sm font-medium">Sair</p>
              </a>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col p-6 lg:p-8">
          <div className="max-w-4xl mx-auto w-full">
            {/* Top Bar */}
            <div className="flex flex-wrap justify-between gap-4 items-center mb-6">
              <h1 className="text-slate-900 dark:text-white text-3xl font-bold">
                Criar Novo Quiz
              </h1>

              <div className="flex gap-3">
                <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-slate-200 dark:bg-slate-800 px-4 text-slate-700 dark:text-slate-300 text-sm font-medium">
                  Cancelar
                </button>

                <button className="flex h-10 items-center justify-center gap-x-2 rounded-lg bg-primary px-4 text-white text-sm font-medium">
                  <span>Continuar</span>
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>

            {/* Card */}
            <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl p-6 lg:p-8">
              <form className="flex flex-col gap-6">
                {/* Título */}
                <div>
                  <label
                    htmlFor="quiz-title"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Título do Quiz
                  </label>
                  <input
                    id="quiz-title"
                    type="text"
                    placeholder="Ex: Gincana 2024 - Quiz 1"
                    className="form-input w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary/50 focus:border-primary/50"
                  />
                </div>

                {/* Descrição */}
                <div>
                  <label
                    htmlFor="quiz-description"
                    className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                  >
                    Descrição
                  </label>
                  <textarea
                    id="quiz-description"
                    rows="4"
                    placeholder="Insira uma breve descrição para este quiz..."
                    className="form-textarea w-full rounded-lg border-slate-200 dark:border-slate-700 bg-background-light dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-primary/50 focus:border-primary/50"
                  ></textarea>
                </div>

                {/* Categorias */}
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-3">
                    Categorias do Quiz
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    Selecione a categoria das perguntas...
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      {
                        value: "filantropicas",
                        label: "Filantrópicas",
                        icon: "volunteer_activism",
                      },
                      {
                        value: "recreativas",
                        label: "Recreativas",
                        icon: "celebration",
                        checked: true,
                      },
                      {
                        value: "esportivas",
                        label: "Esportivas",
                        icon: "sports_soccer",
                      },
                      {
                        value: "culturais",
                        label: "Culturais",
                        icon: "theater_comedy",
                      },
                    ].map((item) => (
                      <label
                        key={item.value}
                        className={`relative flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-colors
                          ${
                            item.checked
                              ? "border-primary bg-primary/5 dark:bg-primary/10"
                              : "border-slate-200 dark:border-slate-700 hover:border-primary dark:hover:border-primary"
                          }`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={item.value}
                          defaultChecked={item.checked}
                          className="absolute opacity-0 w-0 h-0"
                        />

                        <div className="flex items-center justify-center size-12 rounded-full bg-slate-100 dark:bg-slate-700/50 mb-3 text-slate-500 dark:text-slate-400">
                          <span className="material-symbols-outlined text-3xl">
                            {item.icon}
                          </span>
                        </div>

                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {item.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
