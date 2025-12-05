import { useState } from "react";
import { useNavigate } from "react-router-dom";

// perguntas genéricas
const perguntas = [
  {
    categoria: "filantropicas",
    pergunta: "Qual é o principal objetivo de uma ação filantrópica?",
    opcoes: [
      "Gerar lucro para investidores",
      "Ajudar pessoas ou causas sociais",
      "Promover produtos de uma empresa",
      "Organizar eventos esportivos",
    ],
    respostaCorreta: 1,
  },
  {
    categoria: "filantropicas",
    pergunta: "Uma campanha de arrecadação de alimentos é exemplo de qual tipo de ação?",
    opcoes: [
      "Recreativa",
      "Esportiva",
      "Filantrópica",
      "Cultural",
    ],
    respostaCorreta: 2,
  },
  {
    categoria: "recreativas",
    pergunta: "Atividades recreativas têm como foco principal:",
    opcoes: [
      "Competição de alto rendimento",
      "Lazer e diversão",
      "Angariar recursos financeiros",
      "Preservar patrimônio histórico",
    ],
    respostaCorreta: 1,
  },
  {
    categoria: "recreativas",
    pergunta: "Um exemplo comum de atividade recreativa em gincanas é:",
    opcoes: [
      "Corrida de saco",
      "Palestra acadêmica",
      "Doação de sangue",
      "Apresentação teatral profissional",
    ],
    respostaCorreta: 0,
  },
  {
    categoria: "esportivas",
    pergunta: "Atividades esportivas geralmente envolvem:",
    opcoes: [
      "Apenas atividades artísticas",
      "Somente ações de caridade",
      "Regras, competição e desempenho físico",
      "Somente brincadeiras sem regras",
    ],
    respostaCorreta: 2,
  },
  {
    categoria: "esportivas",
    pergunta: "Que tipo de atividade abaixo é considerada esportiva em uma gincana?",
    opcoes: [
      "Torneio de futebol",
      "Apresentação de dança folclórica",
      "Quiz de perguntas e respostas",
      "Oficina de pintura",
    ],
    respostaCorreta: 0,
  },
  {
    categoria: "culturais",
    pergunta: "Atividades culturais buscam principalmente:",
    opcoes: [
      "Reforçar hábitos de consumo",
      "Valorizar expressões artísticas e tradições",
      "Aumentar a competitividade esportiva",
      "Arrecadar fundos para empresas",
    ],
    respostaCorreta: 1,
  },
  {
    categoria: "culturais",
    pergunta: "Um sarau com música e poesia é classificado como atividade:",
    opcoes: [
      "Filantrópica",
      "Recreativa",
      "Esportiva",
      "Cultural",
    ],
    respostaCorreta: 3,
  },
  // mais algumas para garantir 10 por categoria de forma genérica
  {
    categoria: "recreativas",
    pergunta: "Qual destas opções é uma dinâmica recreativa simples?",
    opcoes: [
      "Corrida de obstáculos",
      "Organização de um bazar solidário",
      "Apresentação de coral",
      "Competições de xadrez profissional",
    ],
    respostaCorreta: 0,
  },
  {
    categoria: "filantropicas",
    pergunta: "Uma gincana solidária com arrecadação de roupas é:",
    opcoes: [
      "Competição esportiva",
      "Ação cultural",
      "Atividade recreativa",
      "Ação filantrópica",
    ],
    respostaCorreta: 3,
  },
  {
    categoria: "esportivas",
    pergunta: "Em provas esportivas da gincana, é importante:",
    opcoes: [
      "Ignorar as regras",
      "Valorizar o espírito de equipe e o fair play",
      "Impedir a participação de iniciantes",
      "Evitar qualquer tipo de cooperação",
    ],
    respostaCorreta: 1,
  },
  {
    categoria: "culturais",
    pergunta: "Um concurso de paródias musicais se encaixa melhor em qual categoria?",
    opcoes: [
      "Cultural",
      "Esportiva",
      "Filantrópica",
      "Recreativa",
    ],
    respostaCorreta: 0,
  },
];

export default function Categoria() {
  const [selected, setSelected] = useState(null);
  const [perguntasSelecionadas, setPerguntasSelecionadas] = useState([]);
  const navigate = useNavigate();

  function sortearPerguntasPorCategoria(categoria) {
    const filtradas = perguntas.filter((p) => p.categoria === categoria);
    // embaralha e pega 10 (ou menos, se não houver 10)
    const embaralhadas = [...filtradas].sort(() => Math.random() - 0.5);
    return embaralhadas.slice(0, 10);
  }

  function pergunta() {
  if (!selected) return;

  const selecionadas = sortearPerguntasPorCategoria(selected);
  setPerguntasSelecionadas(selecionadas);

  console.log("Perguntas sorteadas:", selecionadas);

  navigate("/pergunta", { state: { perguntas: selecionadas, categoria: selected } });
}


  function login() {
    navigate("/");
  }

  function usuario() {
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
              <div onClick={login} className="size-14 text-primary cursor-pointer">
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
                className={`${baseCard} ${
                  selected === "filantropicas" ? selectedBorder : normalBorder
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
                className={`${baseCard} ${
                  selected === "recreativas" ? selectedBorder : normalBorder
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
                className={`${baseCard} ${
                  selected === "esportivas" ? selectedBorder : normalBorder
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
                className={`${baseCard} ${
                  selected === "culturais" ? selectedBorder : normalBorder
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
                disabled={!selected}
                className="flex min-w-[84px] max-w-[480px] w-56 cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] transition-all hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-[#020617]"
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
