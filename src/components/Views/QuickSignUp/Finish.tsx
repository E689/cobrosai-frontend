import { IDropZoneViewElements } from '@/app/types/types';
import React, { useEffect } from 'react'
import { GrSend } from "react-icons/gr";

const Finish = ({ setStep }: IDropZoneViewElements) => {

  useEffect(() => {
    setTimeout(() => {
      setStep("select")
    }, 30000)
  }, [setStep])

  return (
    <div className='w-full h-screen flex p-5'>
      <div className='w-[30%] m-auto bg-slate-400/60 dark:bg-blue-950/50 rounded-lg shadow-md p-4 flex flex-col gap-4'>
        <div>
          <GrSend className='w-[40%] h-[40%] m-auto'/>
        </div>
        <div>
          <p className='text-center'>
            Gracias por utilizar Cobros.ai en unos segundos te estaremos enviando un email a Correo
          </p>
        </div>
        <div>
          <p className='text-center font-thin'>
            Si no te ha llegado despues de ~5 minutos revisa tu bandeja de SPAM o revisa el correo que ingresaste.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Finish