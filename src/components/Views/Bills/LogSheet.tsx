import React, { useEffect, useRef, useState } from 'react'

// Sheet imports
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import { TbMessageSearch } from "react-icons/tb";
import { IBillLogData } from '@/app/types/types';
import { GetBillLog } from '@/lib/billsCalls';
import LoaderSpiner from '../../reusable/LoaderSpiner';

const LogSheet = ({ logId, nit }: { logId: string, nit: string }) => {
  const [log, setLog] = useState<IBillLogData[] | undefined>(undefined)
  const baseCase = useRef<number>(-1)

  const handleOnClick = (id: string) => {
    if (id) {
      GetBillLog(id).then((res) => {
        console.log(res)
        setLog(res)
      })
    }
  }

  return (
    <Sheet>
      <SheetTrigger className="flex w-full">
        <TbMessageSearch
          size={20}
          className="m-auto cursor-pointer"
          onClick={() => handleOnClick(logId)} />
      </SheetTrigger>
      <SheetContent className='w-full max-h-screen overflow-y-auto'>
        <SheetHeader>
          <SheetTitle>Registro de la factura:</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          {nit}
        </SheetDescription>
        <div className='flex flex-col gap-2 w-full h-full'>
          {
            log ? (
              log.length > 0 ? (
                log.map((element: IBillLogData, index) => {
                  const date = new Date(element.date)
                  let msgAlignClass = ""
                  let statusChange = {
                    class: "hidden",
                    text: "Ningun cambio"
                  }

                  switch (element.role) {
                    case "system":
                      msgAlignClass = "bg-indigo-500 mx-auto"
                      break;
                    case "assistant":
                      msgAlignClass = "bg-sky-500 ml-auto"
                      break;
                    case "user":
                      msgAlignClass = "bg-emerald-500"
                      if (element.case == 3) {
                        // Message Sent
                        msgAlignClass += " ml-auto"
                      }
                      if (element.case == 4) {
                        // Message received
                        msgAlignClass += " mr-auto"
                      }
                      break;
                    default:
                      msgAlignClass = "bg-slate-300 mx-auto"
                      break;
                  }

                  // Check if case is not 3 or 4 and if the base state changed
                  if (
                    (element.case != 3 && element.case != 4) &&
                    baseCase.current != element.case
                  ) {
                    // Change the base case value.
                    baseCase.current = element.case
                    statusChange.class = "bg-slate-400 rounded-lg text-black w-full font-bold mx-auto my-4 text-center"

                    // Display the message.
                    switch (baseCase.current) {
                      case 0:
                        statusChange.text = "Se ha creado la factura."
                        break;
                      case 2:
                        statusChange.text = "Se ha prendido el AI."
                        break;
                      case 2:
                        statusChange.text = "Se ha apagado el AI."
                        break;
                      case 5:
                        statusChange.text = "Se requiere verificacion."
                        break;
                      case 6:
                        statusChange.text = "Factura anulada."
                        break;
                      default:
                        break;
                    }
                  }

                  return (
                    <div
                      key={index}
                    >
                      <div
                        className={`flex flex-col px-2 py-1 ${msgAlignClass} rounded-lg max-w-[90%]`}
                      >
                        <p className='text-md whitespace-pre-wrap break-words'>{element.content}</p>
                        <p className='text-[8px]'>{`${date.toDateString()}`}</p>
                      </div>
                      <div>
                        <p className={statusChange.class}>{statusChange.text}</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className='w-full h-full flex'>
                  <p className='m-auto'>No hay elementos en el log...</p>
                </div>
              )
            ) : (
              <LoaderSpiner />
            )
          }
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default LogSheet