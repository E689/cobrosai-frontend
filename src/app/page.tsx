'use client'

import DropZoneFile from "@/components/reusable/DropZoneFile";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [phase, setPhase] = useState< 1 | 2 | 3 >(1)

  useEffect(() => {
    console.log(file)
  }, [file])

  return (
    <main className="flex min-h-[80vh] min-w-[100vw] flex-col items-center justify-between p-24 h-full w-full gap-5">
      <div className="flex grow w-full h-screen">
        <DropZoneFile setFile={setFile}/>
      </div>
      <div>
        <div className="flex flex-col items-start justify-center gap-2">
          <p>Vistas disponibles:</p>
          <ul className="flex-1 px-3">
            <li>
              <Link href={'/auth/change'}>
                Cambio Contraseña
              </Link>
            </li>
            <li>
              <Link href={'/auth/recover'}>
                Recuperar Contraseña
              </Link>
            </li>
            <li>
              <Link href={'/auth/register'}>
                Registrarse
              </Link>
            </li>
            <li>
              <Link href={'/auth/signin'}>
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link href={'/auth/signout'}>
                Cerrar Sesion
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col grow">
          <p>Vistas en progreso:</p>
          <ul className="flex-1 px-3">
            <li>
              <Link href={'/dashboard/bills'}>
                Facturas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
