import { supabase } from "@/data/supabase";
import { cn, DELAY_CLASSES } from "@/lib/utils";
import { UserSession } from "@/types/auth";
import { Suspense } from "react";
import { FiLogOut } from "react-icons/fi";
import { Await, Link, useNavigate } from "react-router-dom";

export const AuthButtons = ({
  session,
  delayIndex,
  navigate,
}: {
  session: Promise<UserSession>;
  delayIndex: number;
  navigate: ReturnType<typeof useNavigate>;
}) => (
  <Suspense fallback={<div className="h-12 animate-pulse flex-1 min-w-10" />}>
    <Await resolve={session}>
      {({ user }) =>
        user ? (
          <button
            className={cn(
              "px-4 py-3 hover:bg-red-100 opacity-0 rounded-lg w-full text-red-500 flex gap-2 items-center justify-center animate-fade-in",
              DELAY_CLASSES[delayIndex]
            )}
            onClick={async () => {
              const { error } = await supabase.auth.signOut();
              if (error) {
                console.error(error);
                return;
              }
              navigate(0);
            }}
          >
            Sair
            <FiLogOut size={18} />
          </button>
        ) : (
          <>
            <Link
              className={cn(
                "px-4 py-3 hover:bg-slate-700 bg-slate-900 text-slate-50 drop-shadow rounded-lg hover:rounded-xl animate-fade-in transition-all ease-in-out"
              )}
              to="/login"
            >
              Entrar
            </Link>
            <Link
              className="px-4 py-3 hover:bg-slate-400 hover:text-slate-800 drop-shadow bg-slate-700 text-slate-50 rounded-lg hover:rounded-xl transition-all ease-in-out animate-fade-in duration-500"
              to="/register"
            >
              Cadastrar
            </Link>
          </>
        )
      }
    </Await>
  </Suspense>
);
