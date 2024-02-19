import React, { useEffect, useState } from 'react'

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
import LoaderSpiner from '../LoaderSpiner';

const LogSheet = ({ logId, nit }: { logId: string, nit: string }) => {
  const [log, setLog] = useState<IBillLogData[] | undefined>(undefined)

  const handleOnClick = (id: string) => {
    if (id) {
      GetBillLog(id).then((res) => {
        setLog(res)
        return res
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Registro de la factura:</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          {nit}
        </SheetDescription>
        {
          log ? (
            log.length > 0 ? (
              log.map((element, index) => {
                return (
                  <div key={index}>
                    Element here
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
      </SheetContent>
    </Sheet>
  )
}

export default LogSheet