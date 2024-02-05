'use client'

import BillForm from '@/components/reusable/QuickSignUp/BillForm'
import EmailForm from '@/components/reusable/QuickSignUp/EmailForm'
import Finish from '@/components/reusable/QuickSignUp/Finish'
import LoadFile from '@/components/reusable/QuickSignUp/LoadFile'
import Loading from '@/components/reusable/QuickSignUp/Loading'
import Select from '@/components/reusable/QuickSignUp/Select'
import { RegisterBill, RegisterFile } from '@/lib/authCalls'
import React, { useEffect, useState } from 'react'

import {IRegisterParams} from '@/app/types/types'

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
          const params: IRegisterParams = {email: email, file: file}
          RegisterFile(params)
          .then((res) => {
            console.log(res)
            setTimeout(() => true, 2000)
          })
        } else {
          // Else I know the user did manual flow.
          const params: IRegisterParams = {
            email: email, 
            bill: {
              date: date,
              clientName: companyName,
              clientNit: NIT,
              billId: invoiceNo,
              amount: amount,
              status: "AIOff",
              dueDays: 0,
              logs: ""
            }
          }
          RegisterBill(params)
          .then((res) => {
            console.log(res)
            setTimeout(() => true, 2000)
          })
        }
      } catch (err) {
        console.log(err)
        setFile(undefined)
        setStep("select") // Send the user back to the start.
      } finally {
        setStep("finish") // if nothig goes wrong, finish.
      }
    }

    if (step === "finish") {
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
      }, 600000) // After 10 minutes refresh all 600000ms
    }

  }, [step, file, date, NIT, amount, companyName, email, invoiceNo])

  if (step === "select") return (<Select setFile={setFile} setStep={setStep} />)
  if (step === "loadFile") return (<LoadFile setStep={setStep} />)
  if (step === "billForm") return (<BillForm setDate={setDate} setInvoiceNo={setInvoiceNo} setNIT={setNIT} setAmount={setAmount} setCompanyName={setCompanyName} setStep={setStep} />)
  if (step === "emailForm") return (<EmailForm setEmail={setEmail} setStep={setStep} />)
  if (step === "loading") return (<Loading setStep={setStep} />)
  if (step === "finish") return (<Finish />)
}

export default Drop