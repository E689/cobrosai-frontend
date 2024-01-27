'use client'

import DropZoneFile from "@/components/reusable/DropZoneFile";
import Link from "next/link";
import { useState } from "react";
import { IAuthFormProps } from "./types/types";
import AuthForm from "@/components/reusable/AuthForm";

export default function Home() {
  const [file, setFile] = useState<File | null>(null)

  const AUTH_FORM_PROPS: IAuthFormProps = {
    submitText: "Registrarme",
    formType: "quick"
  }

  return (
    <main className="flex min-h-[80vh] min-w-[100vw] flex-col items-center justify-between p-10 h-full w-full gap-5">
      <div className="flex grow w-full h-[80vh]">
        {
          !file ? (
            <DropZoneFile setFile={setFile} />
          ) : (<></>)
        }
        {
          file ? (
            <div className='m-auto bg-slate-400/60 dark:bg-blue-950/50 rounded-lg shadow-md p-10 w-[60%]'>
              <div className="flex flex-col gap-3 items-center">
                <h3 className="text-3xl font-bold text-center ">Registrarse</h3>
                <p className="text-muted-foreground text-center">Ingresa un correo electronico y te llegaran credenciales temporales.</p>
              </div>
              <AuthForm
                submitText={AUTH_FORM_PROPS.submitText}
                formType={AUTH_FORM_PROPS.formType}
                file={file}
              />
            </div>
          ) : (<></>)
        }
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
