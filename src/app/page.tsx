'use client'

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Home() {

  return (
    <main className="flex min-h-[80vh] min-w-[100vw] flex-col items-center justify-between p-10 h-full w-full gap-5">
      <div>
        <ThemeToggle />
        <div className="flex flex-col items-start justify-center gap-2">
          <p>Vistas Auth: </p>
          <Tabs className="w-full">
            <TabsList>
              <TabsTrigger value="cambio" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                <Link href={'/auth/change'}>
                  Cambio Contraseña
                </Link>
              </TabsTrigger>
              <TabsTrigger value="recuperar" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                <Link href={'/auth/recover'}>
                  Recuperar Contraseña
                </Link>
              </TabsTrigger>
              <TabsTrigger value="register" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                <Link href={'/auth/register'}>
                  Registrarse
                </Link>
              </TabsTrigger>
              <TabsTrigger value="signin" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                <Link href={'/auth/signin'}>
                  Iniciar Sesión
                </Link>
              </TabsTrigger>
              <TabsTrigger value="signout" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                <Link href={'/auth/signout'}>
                  Cerrar Sesion
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <p>Vistas quick flow: </p>
          <Tabs className="w-full">
            <TabsList>
              <TabsTrigger value="quickregister" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                <Link href={'/drop'}>
                  Quick register flow
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <p>Vistas dashboard: </p>
          <Tabs className="w-full">
            <TabsList>
              <TabsTrigger value="dashboard" className="hover:bg-slate-400/60 dark:hover:bg-blue-950/50">
                <Link href={'/dashboard/bills'}>
                  Facturas
                </Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
