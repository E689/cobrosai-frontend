'use client'
import React, { useEffect, useState } from 'react'

import BillForm from '@/components/Views/QuickSignUp/BillForm'
import EmailForm from '@/components/Views/QuickSignUp/EmailForm'
import Finish from '@/components/Views/QuickSignUp/Finish'
import LoadFile from '@/components/Views/QuickSignUp/LoadFile'
import Loading from '@/components/Views/QuickSignUp/Loading'
import Select from '@/components/Views/QuickSignUp/Select'
import { RegisterBill, RegisterFile } from '@/lib/authCalls'

import { toast } from "react-toastify";

import { IRegisterParams } from '@/app/types/types'

const Drop = () => {
  // General fields for this form
  const [file, setFile] = useState<File | undefined>(undefined)
  const [step, setStep] = useState<"select" | "loadFile" | "billForm" | "emailForm" | "loading" | "finish">("select")

  // Manual form values
  const [date, setDate] = useState(undefined)
  const [invoiceNo, setInvoiceNo] = useState(undefined)
  const [NIT, setNIT] = useState(undefined)
  const [amount, setAmount] = useState(undefined)
  const [companyName, setCompanyName] = useState(undefined)

  // email value
  const [email, setEmail] = useState<string | undefined>(undefined)

  // This use effect will change step if a file is properly loaded.
  useEffect(() => {
    if (file) setStep("loadFile")
  }, [file])

  // This useEffect will handle file loading when the step is loading.
  useEffect(() => {
    // Check if the step is correct.
    if (step === "loading") {
      // After I know I'm loading the file I must check what path the user took.
      try {
        if (file) {
          // File is a required param of the file flow
          const params: IRegisterParams = { email: email, file: file }
          RegisterFile(params)
            .then((res) => {
              console.log(res)
              if (res.code !== 200) {
                toast.error(res.message)
                setFile(undefined)
                setStep("select") // Send the user back to the start.
              } else if (res.statusText === "OK") {
                toast.success("Cuenta creada con éxito!")
                setTimeout(() => setStep("finish"), 2000)
              }
            })
        } else {
          // Else I know the user did manual flow.
          const params: IRegisterParams = {
            email: email,
            bill: {
              date: date,
              clientName: companyName,
              clientId: NIT,
              billId: invoiceNo,
              amount: amount,
              status: "AIOff",
              creditDays: 30,
              log: undefined
            }
          }
          RegisterBill(params)
            .then((res) => {
              if (res.code !== 200 ) {
                toast.error(res.message)
                setStep("select") // Send the user back to the start.
              } else if (res.statusText === "OK" || res.statusText === "Created") {
                toast.success("Cuenta creada con éxito!")
                setTimeout(() => setStep("finish"), 2000)
              }
            })
        }
      } catch (err) {
        console.error("Error: ", err)
        toast.error("Algo salio mal, por favor vuelva a intentar mas tarde.")
        setFile(undefined)
        setStep("select") // Send the user back to the start.
      }
    }
  }, [step, file, date, NIT, amount, companyName, email, invoiceNo])

  useEffect(() => {
    if (step === "finish") {
      // TODO: Fix this.
      console.info("Returning to start...")
      setTimeout(() => {
        // Clean file
        setFile(undefined)
        // Clean email
        setEmail(undefined)
        // Clean Manual flow
        setDate(undefined)
        setInvoiceNo(undefined)
        setNIT(undefined)
        setAmount(undefined)
        setCompanyName(undefined)
      }, 6000) // After 1 minutes refresh all 6000ms
    }
  }, [step])

  if (step === "select") return (<Select setFile={setFile} setStep={setStep} />)
  if (step === "loadFile") return (<LoadFile setStep={setStep} />)
  if (step === "billForm") return (
    <div className="w-full max-h-screen p-3 overflow-y-auto">
      <div className='bg-slate-400/60 dark:bg-blue-950/50 rounded-lg shadow-md p-10 w-[30%] m-auto'>
        <BillForm setDate={setDate} setInvoiceNo={setInvoiceNo} setNIT={setNIT} setAmount={setAmount} setCompanyName={setCompanyName} setStep={setStep} />
      </div>
    </div>
  )
  if (step === "emailForm") return (<EmailForm setEmail={setEmail} setStep={setStep} />)
  if (step === "loading") return (<Loading setStep={setStep} />)
  if (step === "finish") return (<Finish setStep={setStep} />)
}

export default Drop