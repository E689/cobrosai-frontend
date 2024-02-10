'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { ChangeEvent, useEffect, useState } from 'react'
import BillForm from "../QuickSignUp/BillForm"

const UploadBills = () => {
  const [file, setFile] = useState<undefined | File>(undefined)

  // Manual form values
  const [date, setDate] = useState(undefined)
  const [invoiceNo, setInvoiceNo] = useState(undefined)
  const [NIT, setNIT] = useState(undefined)
  const [amount, setAmount] = useState(undefined)
  const [companyName, setCompanyName] = useState(undefined)

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }

    setFile(target.files[0])
  }

  useEffect(() => {
    document.getElementById("dropArea")?.addEventListener("dragover",
      (e: Event) => {
        e.preventDefault()
      })

    document.getElementById("dropArea")?.addEventListener("drop",
      (e: DragEvent) => {
        e.preventDefault()
        const dropFile: FileList | undefined = e.dataTransfer?.files
        setFile(dropFile![0])
      })
  }, [])

  // File hook.
  useEffect(() => {
    if (file) {
      // TODO: Add upload file EP call here...

      // Clean file
      setFile(undefined)
    }
  }, [file])

  // Manual single bill hook.
  useEffect(() => {
    if (date && invoiceNo && NIT && amount && companyName) {
      // TODO: Add create single bill EP call here...

      // Clean fields
      setDate(undefined)
      setInvoiceNo(undefined)
      setNIT(undefined)
      setAmount(undefined)
      setCompanyName(undefined)
    }
  }, [date, invoiceNo, NIT, amount, companyName])

  return (
    <div className='w-full h-full flex flex-row gap-2'>
      <div className="grid max-w-[40%] h-full p-2">
        <label
          htmlFor="billFile"
          className='w-full h-full bg-slate-400/60 dark:bg-blue-950/50 text-center 
          rounded-lg border-4 border-dashed border-black/50 dark:border-white/50
          gap-0 justify-center flex px-4'
          id='dropArea'
        >
          <input hidden={true} id="billFile" type="file" onChange={handleOnChange} accept='application/*' />
          <p className='text-md font-bold m-auto'>Haz click o suelta un archivo en esta zona para cargar facturas.</p>
        </label>
      </div>
      <div className="flex">
        <Dialog>
          <DialogTrigger className="h-[80%] my-auto bg-white/80 dark:bg-blue-900/80 px-2 rounded-lg">Ingreso manual</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <BillForm
                  setDate={setDate}
                  setInvoiceNo={setInvoiceNo}
                  setNIT={setNIT}
                  setAmount={setAmount}
                  setCompanyName={setCompanyName}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default UploadBills