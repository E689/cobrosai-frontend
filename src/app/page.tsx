import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-[80vh] min-w-[100vw] flex-col items-center justify-between p-24 h-full w-full gap-5">
      <div className="flex grow">
        Subir tu archivo (incompleto...)
      </div>
      <div className="flex flex-col grow">
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
    </main>
  );
}
