'use client'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import React, { ChangeEvent, useEffect, useState } from 'react'
import BillForm from "../QuickSignUp/BillForm"
import { CreateBillManually, CreateBillsFromXls } from "@/lib/billsCalls"
import LoaderSpiner from "../../reusable/LoaderSpiner"
import { toast } from "react-toastify";

const UploadBills = ({
  token,
  setHasDataChange
}: {
  token: string | undefined,
  setHasDataChange: Function
}) => {
  // File loading state.
  const [isUploadin, setIsUploading] = useState<boolean>(false)

  // File state
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
      setIsUploading(true)
      // TODO: Add upload file EP call here...
      CreateBillsFromXls(token!, file).then((res) => {
        toast.success("Archivo cargado con éxito!")
        setHasDataChange(true)
        return res
      })
      .catch((err) => {
        toast.error("Error al cargar el archivo.")
        console.error(err)
      })
      .finally(() => {
        setIsUploading(false)
      })
      // Clean file
      setFile(undefined)
    }
  }, [file, token, setHasDataChange])

  // Manual single bill hook.
  useEffect(() => {
    if (date && invoiceNo && NIT && amount && companyName) {
      // TODO: Add create single bill EP call here...
      CreateBillManually({amount:amount, date: date, clientId: NIT, clientName: companyName, billId: invoiceNo, token: token!} )
      .then((res) => {
        toast.success("Factura creada con éxito!")
        setHasDataChange(true)
        return res
      })

      // Clean fields
      setDate(undefined)
      setInvoiceNo(undefined)
      setNIT(undefined)
      setAmount(undefined)
      setCompanyName(undefined)
    }
  }, [date, invoiceNo, NIT, amount, companyName, token, setHasDataChange])

  if (isUploadin) {
    <div className='w-full h-full flex'>
      <LoaderSpiner />
    </div>
  } else {
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
            <DialogTrigger className="h-[80%] my-auto bg-white/80 dark:bg-blue-950 dark:hover:bg-blue-950/70 px-2 rounded-lg">Ingreso manual</DialogTrigger>
            <DialogContent>
              <BillForm
                setDate={setDate}
                setInvoiceNo={setInvoiceNo}
                setNIT={setNIT}
                setAmount={setAmount}
                setCompanyName={setCompanyName}
                setStep={() => true}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    )
  }
}

export default UploadBills