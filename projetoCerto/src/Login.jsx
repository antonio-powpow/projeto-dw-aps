import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function cadastro() {
    navigate("/cadastro");
  }

  function categoria(){
    navigate("/categoria");
  }

  return (
    <div className="font-display bg-background-light dark:bg-background-dark">
      <div className="relative flex min-h-screen w-full flex-col">
        <div className="flex flex-1">
          <div className="grid w-full grid-cols-1 md:grid-cols-2">

            {/* LEFT COLUMN */}
            <div className="relative hidden h-full flex-col justify-between bg-zinc-900 p-10 text-white md:flex">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="/utfpr.jpg"
                  alt="utfpr"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
              </div>

              <div className="relative z-20 flex items-center gap-3 text-lg font-medium">
                <span className="w-full md:w-1/6 lg:w-1/6 h-auto" ><img
                  src="/quiz.png"
                  alt="Quiz UTFPR"
                /></span>
              </div>

              <div className="relative z-20 mt-auto">
                <p className="text-2xl font-semibold italic">
                  "Teste seus conhecimentos e prepare-se para a gincana.
                  A vitória começa aqui!"
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-8">
              <div className="mx-auto flex w-full max-w-md flex-col justify-center space-y-6">
                <div className="flex flex-col gap-3 text-center md:text-left">
                  <h1 className="text-3xl font-black text-zinc-900 dark:text-white sm:text-4xl">
                    Acesse sua conta
                  </h1>
                  <p className="text-base text-zinc-600 dark:text-zinc-400">
                    Bem-vindo ao Quiz UTFPR.
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-4">

                    {/* EMAIL */}
                    <label className="flex flex-col flex-1">
                      <p className="text-base font-medium pb-2 text-zinc-900 dark:text-white">
                        Email
                      </p>
                      <input
                        className="form-input w-full rounded-lg border border-zinc-300 bg-transparent px-4 py-3 
                        text-zinc-900 placeholder:text-zinc-400 
                        focus:border-primary focus:outline-none focus:ring-2 
                        focus:ring-primary/20 dark:border-zinc-700 dark:text-white"
                        placeholder="Digite seu email"
                      />
                    </label>

                    {/* SENHA */}
                    <label className="flex flex-col flex-1">
                      <p className="text-base font-medium pb-2 text-zinc-900 dark:text-white">
                        Senha
                      </p>

                      <div className="flex w-full items-stretch rounded-lg">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-input w-full rounded-r-none rounded-lg border border-r-0 border-zinc-300 bg-transparent 
                          px-4 py-3 text-zinc-900 placeholder:text-zinc-400 
                          focus:border-primary focus:outline-none focus:ring-2 
                          focus:ring-primary/20 dark:border-zinc-700 dark:text-white"
                          placeholder="Digite sua senha"
                        />

                        <div
                          className="flex items-center justify-center rounded-r-lg border border-l-0 border-zinc-300 px-3 
                          text-zinc-500 dark:border-zinc-700 dark:text-zinc-400 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <span className="material-symbols-outlined">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <a className="text-sm underline text-zinc-600 hover:text-primary dark:text-zinc-400 dark:hover:text-primary">
                      Esqueceu sua senha?
                    </a>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-col gap-4">
                    <button
                    onClick={categoria}
                    className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border 
                    border-zinc-300 px-5 font-bold hover:bg-zinc-100 dark:border-zinc-700 dark:text-white 
                    dark:hover:bg-zinc-800">
                      Entrar
                    </button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-zinc-300 dark:border-zinc-700"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="px-2 bg-background-light dark:bg-background-dark text-zinc-500">
                          ou
                        </span>
                      </div>
                    </div>

                    <button className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border 
                    border-zinc-300 px-5 font-bold hover:bg-zinc-100 dark:border-zinc-700 dark:text-white 
                    dark:hover:bg-zinc-800">
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>

                      <span>Entrar com Google</span>
                    </button>
                  </div>
                </div>

                <p className="px-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
                  Não tem uma conta?{" "}
                  <button onClick={cadastro} className="font-medium underline hover:text-primary" >Cadastre-se</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
