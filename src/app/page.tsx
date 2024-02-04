'use client'

import DropZoneFile from "@/components/reusable/DropZoneFile";
import Link from "next/link";
import { useState } from "react";
import { IAuthFormProps } from "./types/types";
import AuthForm from "@/components/reusable/AuthForm";

export default function Home() {

  const AUTH_FORM_PROPS: IAuthFormProps = {
    submitText: "Registrarme",
    formType: "quick"
  }

  return (
    <main className="flex min-h-[80vh] min-w-[100vw] flex-col items-center justify-between p-10 h-full w-full gap-5">
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
            <li>
              <Link href={'/drop'}>
                Quick register flow
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
