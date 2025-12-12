import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import { supabase } from "./supabaseClient"; 

export default function Cadastro() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // Função de navegação para a página de login
    function irParaLogin() {
        navigate("/");
    }

    // Estados para os campos do formulário
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmaSenha, setConfirmaSenha] = useState("");

    // Função para validar a força e o formato da senha
    const validarSenha = (senha) => {
        if (senha.length < 4 || senha.length > 6) {
            return "A senha deve ter entre 4 e 6 caracteres.";
        }
        if (/^(\d)\1+$/.test(senha) || /^([a-zA-Z])\1+$/.test(senha)) {
            return "Senha muito fraca. Evite caracteres repetidos.";
        }
        const sequencias = ["1234", "2345", "3456", "4567", "5678", "6789", "9876", "8765", "7654", "6543", "5432", "4321"];
        if (sequencias.includes(senha)) {
            return "Senha muito fraca. Evite sequências numéricas.";
        }
        return null;
    };

    // Função principal para lidar com o cadastro
    const handleCadastro = async () => {
        if (!email || !senha || !confirmaSenha) {
            Swal.fire("Atenção", "Preencha todos os campos", "warning");
            return;
        }

        if (senha !== confirmaSenha) {
            Swal.fire("Erro", "As senhas não coincidem", "error");
            return;
        }

        const erroSenha = validarSenha(senha);
        if (erroSenha) {
            Swal.fire("Senha Inválida", erroSenha, "error");
            return;
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: senha,
            });

            if (error) {
                if (error.message.includes("User already registered")) {
                    Swal.fire("Erro", "Este e-mail já está cadastrado. Tente fazer login.", "error");
                } else {
                    Swal.fire("Erro no Cadastro", error.message, "error");
                }
                return;
            }

            if (data.user) {
                Swal.fire({
                    icon: "success",
                    title: "Cadastro realizado!",
                    text: "",
                    timer: 2500,
                    showConfirmButton: false,
                });
                irParaLogin();
            }
        } catch (catchedError) {
            Swal.fire("Erro Inesperado", "Ocorreu um problema. Tente novamente mais tarde.", "error");
            console.error("Erro inesperado no handleCadastro:", catchedError);
        }
    };

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background-light dark:bg-background-dark p-4 font-display" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
            <div className="layout-container flex w-full max-w-lg flex-col items-center justify-center">
                <div className="w-full h-full flex items-center justify-center mb-4">
                    <div className="flex-auto w-full bg-center bg-no-repeat bg-contain aspect-[3/1] max-w-[100px]">
                        <span><img src="/quiz.png" alt="Quiz UTFPR" /></span>
                    </div>
                    <div className="flex w-full flex-col items-center gap-3">
                        <p className="text-3xl font-black text-gray-900 dark:text-white leading-tight tracking-[-0.033em]">
                            Crie sua Conta
                        </p>
                        <p className="text-base font-normal text-gray-500 dark:text-[#9da6b9] leading-normal">
                            Comece sua jornada conosco hoje mesmo.
                        </p>
                    </div>
                </div>

                <form className="mt-8 flex w-full flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleCadastro(); }}>
                    <label className="flex flex-col flex-1">
                        <p className="pb-2 text-base font-medium text-gray-900 dark:text-white leading-normal">
                            E-mail
                        </p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary h-14 placeholder:text-gray-400 dark:placeholder:text-[#9da6b9] p-[15px] text-base font-normal leading-normal border border-gray-300 dark:border-[#3b4354] bg-white dark:bg-[#1c1f27] focus:border-primary"
                            placeholder="Digite seu e-mail"
                        />
                    </label>

                    <label className="flex flex-col flex-1">
                        <p className="pb-2 text-base font-medium text-gray-900 dark:text-white leading-normal">
                            Senha
                        </p>
                        <div className="relative flex w-full flex-1 items-stretch">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary h-14 placeholder:text-gray-400 dark:placeholder:text-[#9da6b9] p-[15px] pr-12 text-base font-normal leading-normal border border-gray-300 dark:border-[#3b4354] bg-white dark:bg-[#1c1f27] focus:border-primary"
                                placeholder="Crie uma senha"
                            />
                            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 dark:text-[#9da6b9] hover:text-gray-600 dark:hover:text-white">
                                <span className="material-symbols-outlined">{showPassword ? "visibility_off" : "visibility"}</span>
                            </button>
                        </div>
                    </label>

                    <label className="flex flex-col flex-1">
                        <p className="pb-2 text-base font-medium text-gray-900 dark:text-white leading-normal">
                            Confirmar Senha
                        </p>
                        <input
                            type="password"
                            value={confirmaSenha}
                            onChange={(e) => setConfirmaSenha(e.target.value)}
                            placeholder="Digite a senha novamente"
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary h-14 placeholder:text-gray-400 dark:placeholder:text-[#9da6b9] p-[15px] text-base font-normal leading-normal border border-gray-300 dark:border-[#3b4354] bg-white dark:bg-[#1c1f27] focus:border-primary"
                        />
                    </label>

                    <div className="mt-6 flex w-full flex-col items-center gap-4">
                        <button
                            type="submit"
                            className="flex h-14 w-full cursor-pointer items-center justify-center rounded-lg bg-primary text-base font-bold text-white transition-colors hover:bg-primary/90"
                        >
                            Registrar
                        </button>
                        
                        <p className="text-base font-normal text-gray-500 dark:text-[#9da6b9]">
                            Já tem uma conta?{" "}
                             <button
                                type="button"
                                onClick={irParaLogin}
                                className="hover:underline font-bold underline hover:text-primary"
                             >
                                Faça login
                             </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
