import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "./componetesTela/QuizContext";

export default function Cadastro() {
    const { t } = useQuiz();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    function categoria() { navigate("/categoria"); }
    function login(){ navigate("/"); }

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4 group/design-root font-display" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
            <div className="layout-container flex w-full max-w-lg flex-col items-center justify-center">
                <div className=" w-full h-full flex items-center justify-center">
                    <div className=" flex-auto w-full bg-center bg-no-repeat bg-contain aspect-[3/1] max-w-[100px]">
                        <span><img src="/quiz.png" alt="Quiz UTFPR" /></span>
                    </div>
                    <div className="flex w-full flex-col items-center gap-3">
                        <p className="text-3xl font-black text-gray-900 dark:text-white leading-tight tracking-[-0.033em]">
                            {t('cadastro_titulo')}
                        </p>
                        <p className="text-base font-normal text-gray-500 dark:text-[#9da6b9] leading-normal">
                            {t('cadastro_subtitulo')}
                        </p>
                    </div>
                </div>

                <form className="mt-8 flex w-full flex-col gap-4">
                    {/* Email */}
                    <label className="flex flex-col flex-1">
                        <p className="pb-2 text-base font-medium text-gray-900 dark:text-white leading-normal">
                            {t('cadastro_email')}
                        </p>
                        <input type="email" className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary h-14 placeholder:text-gray-400 dark:placeholder:text-[#9da6b9] p-[15px] text-base font-normal leading-normal border border-gray-300 dark:border-[#3b4354] bg-white dark:bg-[#1c1f27] focus:border-primary"
                            placeholder={t('cadastro_placeholder_email')} />
                    </label>

                    {/* Senha */}
                    <label className="flex flex-col flex-1">
                        <p className="pb-2 text-base font-medium text-gray-900 dark:text-white leading-normal">
                            {t('cadastro_senha')}
                        </p>
                        <div className="relative flex w-full flex-1 items-stretch">
                            <input type={showPassword ? "text" : "password"}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary h-14 placeholder:text-gray-400 dark:placeholder:text-[#9da6b9] p-[15px] pr-12 text-base font-normal leading-normal border border-gray-300 dark:border-[#3b4354] bg-white dark:bg-[#1c1f27] focus:border-primary"
                                placeholder={t('cadastro_placeholder_senha')}
                            />
                            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 dark:text-[#9da6b9] hover:text-gray-600 dark:hover:text-white">
                                <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                            </button>
                        </div>
                    </label>

                    {/* Confirmar senha */}
                    <label className="flex flex-col flex-1">
                        <p className="pb-2 text-base font-medium text-gray-900 dark:text-white leading-normal">
                            {t('cadastro_confirmar')}
                        </p>
                        <input type="password" placeholder={t('cadastro_placeholder_conf')}
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary h-14 placeholder:text-gray-400 dark:placeholder:text-[#9da6b9] p-[15px] text-base font-normal leading-normal border border-gray-300 dark:border-[#3b4354] bg-white dark:bg-[#1c1f27] focus:border-primary"
                        />
                    </label>

                    {/* Botão */}
                    <div className="mt-6 flex w-full flex-col items-center gap-4">
                        {/* ADICIONADO type="button" AQUI TAMBÉM PARA PREVENIR RELOAD AO REGISTRAR */}
                        <button 
                            type="button" 
                            onClick={categoria} 
                            className="flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-primary text-base font-bold text-white transition-colors hover:bg-primary/90"
                        >
                            {t('cadastro_btn_registrar')}
                        </button>
                        
                        <p className="text-base font-normal text-gray-500 dark:text-[#9da6b9]">
                            {t('cadastro_tem_conta')}{" "}
                             {/* ADICIONADO type="button" AQUI (Correção Principal) */}
                             <button 
                                type="button" 
                                onClick={login} 
                                className="hover:underline font-bold underline hover:text-primary"
                             >
                                {t('cadastro_faca_login')}
                             </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}