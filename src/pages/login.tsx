import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { FormField } from "../components/form-field";
import { supabase } from "../data/supabase";
import { cn } from "../lib/tailwind";

export function LoginPage() {
  const navigate = useNavigate();
  const form = useForm({
    onSubmit: async ({ value }) => {
      const { email, password } = value as { email: string; password: string };

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error(error);
          return;
        }

        console.log(data);

        navigate("/");
      } catch (error) {
        console.error(error);
      }
    },
    validatorAdapter: zodValidator(),
  });

  const { Field, Subscribe, handleSubmit } = form;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-semibold text-gray-800 ">
        <strong>SupCommerce</strong>
      </h1>
      <p className="text-gray-600 mb-8">Faça login para continuar</p>
      <form
        className="flex flex-col gap-4 max-w-sm w-full"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <FormField
          id="email"
          type="email"
          Field={Field}
          label="Email"
          validators={{
            onChange: z
              .string({
                required_error: "Email é um campo obrigatório",
              })
              .email({
                message: "Email inválido",
              }),
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: z
              .string()
              .email()
              .refine(
                async (value) => {
                  return !value.includes("error");
                },
                {
                  message: "No 'error' allowed in email",
                }
              ),
          }}
        />
        <FormField
          id="password"
          type="password"
          Field={Field}
          label="Password"
          validators={{
            onChange: z
              .string({
                required_error: "Senha é um campo obrigatório",
              })
              .min(8, {
                message: "Senha deve ter no mínimo 8 caracteres",
              }),
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: z
              .string()
              .min(8)
              .refine(
                async (value) => {
                  return !value.includes("error");
                },
                {
                  message: "No 'error' allowed in password",
                }
              ),
          }}
        />

        <Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              className="px-4 py-3 flex items-center justify-center gap-2 bg-black text-white rounded-lg font-medium disabled:cursor-not-allowed disabled:opacity-70 transition-all ease-in-out"
              type="submit"
              disabled={!canSubmit && !isSubmitting}
            >
              <svg
                aria-hidden="true"
                className={cn(
                  "size-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600",
                  {
                    hidden: !isSubmitting,
                  }
                )}
                viewBox="0 0 100 101"
                fill="none"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              Enviar
            </button>
          )}
        />
      </form>
    </div>
  );
}
