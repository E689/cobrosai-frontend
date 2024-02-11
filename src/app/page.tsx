'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { IAuthContext } from "./types/types";
import { useRouter } from "next/navigation"

export default function Home() {
  const { authUser } = useContext(AuthContext) as IAuthContext

  // Router
  const router = useRouter()

  return (
    <main className="flex min-h-[80vh] min-w-[100vw] flex-col items-center justify-between p-10 h-full w-full gap-5">
      <div>
        <ThemeToggle />
        <div className="flex flex-col items-start justify-center gap-2">
          <div>
          <p>El usuario: {`${authUser?.email}`} esta registrado</p>
          </div>
          <p>Vistas Auth: </p>
          <Tabs className="w-full">
            <TabsList>
              <TabsTrigger onClick={() => router.push("/auth/change")} value="cambio" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
              Cambio Contraseña
              </TabsTrigger>
              <TabsTrigger onClick={() => router.push("/auth/recover")} value="recuperar" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                  Recuperar Contraseña
              </TabsTrigger>
              <TabsTrigger onClick={() => router.push("/auth/register")} value="register" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                  Registrarse
              </TabsTrigger>
              <TabsTrigger onClick={() => router.push("/auth/signin")} value="signin" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                  Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger onClick={() => router.push("/auth/signout")} value="signout" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                  Cerrar Sesion
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <p>Vistas quick flow: </p>
          <Tabs className="w-full">
            <TabsList>
              <TabsTrigger onClick={() => router.push("/drop")} value="quickregister" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                  Quick register flow
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <p>Vistas dashboard: </p>
          <Tabs className="w-full">
            <TabsList>
              <TabsTrigger onClick={() => router.push("/dashboard/bills")} value="dashboard" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                  Facturas
              </TabsTrigger>
              <TabsTrigger onClick={() => router.push("/dashboard/clients")} value="dashboard" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                  Empresas
              </TabsTrigger>
              <TabsTrigger onClick={() => router.push("/dashboard/flows")} value="dashboard" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                  Flujos
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
