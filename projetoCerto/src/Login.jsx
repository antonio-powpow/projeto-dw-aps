import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "./componetesTela/QuizContext";
import { supabase } from "./supabaseClient";
import Swal from "sweetalert2";

export default function Login() {
  const { t } = useQuiz();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const cadastro = useCallback(() => {
    navigate("/cadastro");
  }, [navigate]);

  const categoria = useCallback(() => {
    navigate("/categoria");
  }, [navigate]);

  // Verifica se o usuário já está logado ao abrir a página
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        categoria(); // aqui AGORA está chamando a função
      }
    };

    checkSession();
  }, [categoria]);

  // Login com email e senha
  const handleSignIn = async () => {
    if (!email || !senha) {
      Swal.fire("Erro", "Preencha todos os campos", "error");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        Swal.fire(
          "Erro",
          "Email ou senha incorretos. Tente novamente.",
          "error"
        );
      } else {
        Swal.fire("Erro", error.message, "error");
      }
    } else {
      Swal.fire("Sucesso", "Login realizado!", "success");
      setTimeout(() => categoria(), 1500);
    }
  };

  // Login com Google
  const handleSignInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // em produção, isso será algo como https://seu-app.vercel.app/categoria
          redirectTo: `${window.location.origin}/categoria`,
        },
      });

      if (error) {
        if (
          error.message.includes("already registered") ||
          error.message.includes("user already exists")
        ) {
          Swal.fire({
            icon: "error",
            title: "Email já cadastrado",
            text: "Este email já está registrado com outro método de login. Tente entrar com sua senha ou redefina sua senha.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Erro ao entrar com Google",
            text: error.message,
          });
        }
      } else {
        Swal.fire({
          icon: "success",
          title: "Acessando com Google",
          text: "Você será redirecionado...",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Erro inesperado",
        text: err.message,
      });
    }
  };

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
                <span className="w-full md:w-1/6 lg:w-1/6 h-auto">
                  <img src="/quiz.png" alt="Quiz UTFPR" />
                </span>
              </div>
              <div className="relative z-20 mt-auto">
                <p className="text-2xl font-semibold italic">
                  {t("login_frase_esq")}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-8">
              <div className="mx-auto flex w-full max-w-md flex-col justify-center space-y-6">
                <div className="flex flex-col gap-3 text-center md:text-left">
                  <h1 className="text-3xl font-black text-zinc-900 dark:text-white sm:text-4xl">
                    {t("login_titulo")}
                  </h1>
                  <p className="text-base text-zinc-600 dark:text-zinc-400">
                    {t("login_subtitulo")}
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-4">
                    {/* EMAIL */}
                    <label className="flex flex-col flex-1">
                      <p className="text-base font-medium pb-2 text-zinc-900 dark:text-white">
                        {t("login_email")}
                      </p>
                      <input
                        type="email"
                        className="form-input w-full rounded-lg border border-zinc-300 bg-transparent px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-zinc-700 dark:text-white"
                        placeholder={t("login_placeholder_email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>

                    {/* SENHA */}
                    <label className="flex flex-col flex-1">
                      <p className="text-base font-medium pb-2 text-zinc-900 dark:text-white">
                        {t("login_senha")}
                      </p>
                      <div className="flex w-full items-stretch rounded-lg">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-input w-full rounded-r-none rounded-lg border border-r-0 border-zinc-300 bg-transparent px-4 py-3 text-zinc-900 placeholder:text-zinc-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-zinc-700 dark:text-white"
                          placeholder={t("login_placeholder_senha")}
                          value={senha}
                          onChange={(e) => setSenha(e.target.value)}
                        />
                        <div
                          className="flex items-center justify-center rounded-r-lg border border-l-0 border-zinc-300 px-3 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <span className="material-symbols-outlined">
                            {showPassword ? "visibility_off" : "visibility"}
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={handleSignIn}
                      className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-zinc-300 px-5 font-bold hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                    >
                      {t("login_btn_entrar")}
                    </button>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-zinc-300 dark:border-zinc-700"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="px-2 bg-background-light dark:bg-background-dark text-zinc-500">
                          {t("login_ou")}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleSignInWithGoogle}
                      className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-zinc-300 px-5 font-bold hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span>{t("login_google")}</span>
                    </button>
                  </div>
                </div>

                <p className="px-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
                  {t("login_sem_conta")}{" "}
                  <button
                    onClick={cadastro}
                    className="hover:underline font-bold underline hover:text-primary"
                  >
                    {t("login_cadastre_se")}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
