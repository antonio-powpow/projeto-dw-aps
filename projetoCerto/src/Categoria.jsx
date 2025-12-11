import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { useQuiz } from "./componetesTela/QuizContext";

export default function Categoria() {
  const { t } = useQuiz();
  const [selected, setSelected] = useState(null);
  const [perguntasDoBanco, setPerguntasDoBanco] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [perguntasSelecionadas, setPerguntasSelecionadas] = useState([]);
  const [animatingFade, setAnimatingFade] = useState(false);
  const [animatingCenter, setAnimatingCenter] = useState(false);
  
  const navigate = useNavigate();

  // --- BUSCA E CONVERSÃO DOS DADOS ---
  useEffect(() => {
    async function fetchPerguntas() {
      setLoading(true);
      const { data, error } = await supabase.from('perguntas').select('*');
      
      if (error) {
        console.error("Erro ao buscar perguntas:", error);
      } else {
        const perguntasFormatadas = data.map(p => ({
          ...p,
          // --- CORREÇÃO AQUI: Força a conversão para NÚMERO ---
          respostaCorreta: Number(p.resposta_correta) 
        }));
        setPerguntasDoBanco(perguntasFormatadas);
      }
      setLoading(false);
    }
    fetchPerguntas();
  }, []);

  function sortearPerguntasPorCategoria(categoria) {
    const filtradas = perguntasDoBanco.filter((p) => 
      p.categoria.toLowerCase() === categoria.toLowerCase()
    );
    const embaralhadas = [...filtradas].sort(() => Math.random() - 0.5);
    return embaralhadas.slice(0, 10);
  }

  function handleSelecionar(categoria) {
    if (animatingFade || animatingCenter) return;

    const selecionadas = sortearPerguntasPorCategoria(categoria);
    
    if (selecionadas.length === 0) {
      alert(t('cat_vazia_erro'));
      return;
    }

    setSelected(categoria);
    setPerguntasSelecionadas(selecionadas);
    setAnimatingCenter(true);
  }

  useEffect(() => {
    if (!animatingCenter || !selected || !perguntasSelecionadas.length) return;

    const timerCenter = setTimeout(() => {
      setAnimatingFade(true); 
      const timerFade = setTimeout(() => {
        navigate("/pergunta", {
          state: { perguntas: perguntasSelecionadas, categoria: selected },
        });
      }, 350);
      return () => clearTimeout(timerFade);
    }, 350);

    return () => clearTimeout(timerCenter);
  }, [animatingCenter, selected, perguntasSelecionadas, navigate]);

  function login() { navigate("/"); }
  function usuario() { navigate("/usuario"); }

  // Estilos
  const baseCard = "flex flex-1 flex-col gap-4 rounded-lg border p-6 transition-all cursor-pointer bg-white dark:bg-white/5 shadow-sm dark:shadow-none backdrop-blur-sm";
  const normalBorder = "border-gray-200 dark:border-white/5 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1";
  const selectedBorder = "border-primary shadow-lg ring-2 ring-primary/60 scale-[1.03]";
  const containerAnim = animatingFade ? "scale-95 opacity-0" : "scale-100 opacity-100";

  function getCardClasses(categoriaKey) {
    const isSelected = selected === categoriaKey;
    const invisivel = selected && selected !== categoriaKey;
    const slideClass = isSelected && animatingCenter ? "translate-y-[-10px]" : "";
    return (
      (invisivel ? "opacity-0 " : "opacity-100 ") +
      baseCard + " " + (isSelected ? selectedBorder : normalBorder) + " " + slideClass
    );
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#020617] text-gray-800 dark:text-white">Loading...</div>;

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#020617] font-display text-gray-900 dark:text-white transition-colors duration-300">
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden p-4 sm:p-6 md:p-8">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-white to-slate-100 dark:from-[#020617] dark:to-[#020617]">
          <div className="absolute inset-x-0 top-40 mx-auto h-[420px] w-[720px] rounded-[999px] bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.35),_transparent_60%)] opacity-70 blur-3xl hidden dark:block" />
        </div>

        <div className="w-full max-w-5xl">
          <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-white/10 px-6 sm:px-10 py-4">
            <div className="flex items-center gap-4 text-gray-800 dark:text-white">
              <div onClick={login} className="size-14 text-primary cursor-pointer">
                <img src="/quiz.png" alt="Quiz UTFPR" className="w-full h-auto" />
              </div>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Quiz UTFPR</h2>
            </div>
            <div onClick={usuario} className="hidden sm:flex items-center gap-9 cursor-pointer">
              <span className="text-gray-400 hover:text-primary">
                <span className="material-symbols-outlined text-2xl">account_circle</span>
              </span>
            </div>
          </header>
        </div>

        <main className="flex flex-1 flex-col items-center justify-center w-full max-w-5xl py-12 sm:py-16 md:py-20">
          <div className={`flex flex-col items-center gap-10 w-full transform transition-all duration-300 ease-out ${containerAnim}`}>
            <div className="flex flex-col items-center gap-2">
              <h1 className="tracking-tight text-4xl sm:text-5xl font-bold leading-tight text-center">
                {t('cat_titulo')}
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal text-center max-w-md">
                {t('cat_subtitulo')}
              </p>
            </div>

            <div className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 p-4">
              {/* Categorias */}
              <button type="button" onClick={() => handleSelecionar("Filantrópicas")} className={getCardClasses("Filantrópicas")}>
                <div className="text-orange-500 dark:text-orange-400"><span className="material-symbols-outlined text-4xl">volunteer_activism</span></div>
                <div className="flex flex-col gap-1 text-left">
                  <h2 className="text-lg font-bold">{t('cat_filantropicas')}</h2>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">{t('cat_filantropicas_desc')}</p>
                </div>
              </button>

              <button type="button" onClick={() => handleSelecionar("Recreativas")} className={getCardClasses("Recreativas")}>
                <div className="text-teal-500 dark:text-teal-400"><span className="material-symbols-outlined text-4xl">toys</span></div>
                <div className="flex flex-col gap-1 text-left">
                  <h2 className="text-lg font-bold">{t('cat_recreativas')}</h2>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">{t('cat_recreativas_desc')}</p>
                </div>
              </button>

              <button type="button" onClick={() => handleSelecionar("Esportivas")} className={getCardClasses("Esportivas")}>
                <div className="text-red-500 dark:text-red-400"><span className="material-symbols-outlined text-4xl">trophy</span></div>
                <div className="flex flex-col gap-1 text-left">
                  <h2 className="text-lg font-bold">{t('cat_esportivas')}</h2>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">{t('cat_esportivas_desc')}</p>
                </div>
              </button>

              <button type="button" onClick={() => handleSelecionar("Culturais")} className={getCardClasses("Culturais")}>
                <div className="text-indigo-500 dark:text-indigo-400"><span className="material-symbols-outlined text-4xl">theater_comedy</span></div>
                <div className="flex flex-col gap-1 text-left">
                  <h2 className="text-lg font-bold">{t('cat_culturais')}</h2>
                  <p className="text-gray-500 dark:text-gray-300 text-sm">{t('cat_culturais_desc')}</p>
                </div>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}