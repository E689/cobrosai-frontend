'use client'

import { IFlowChat } from '@/app/types/types'
import LoaderSpiner from '@/components/reusable/LoaderSpiner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DeleteFlowChat, GetFlowChat, SendFlowTestMessage } from '@/lib/flowCalls'
import React, { useEffect, useRef, useState } from 'react'

// If action is edit, get the flow data
const getChat = (flowId: number, setData: Function): void => {
  GetFlowChat(flowId)
    .then((res) => {
      console.log("Data res: ", res)
      setData(res)
    })
}

const FlowTestChat = ({ flowId }: { flowId: number }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [data, setData] = useState<IFlowChat[] | undefined>(undefined)
  const [isSendig, setIsSending] = useState<boolean | undefined>(false)
  const [message, setMessage] = useState<string | undefined>(undefined)
  const baseCase = useRef<number>(-1)
  const [refresh, setRefresh] = useState(0)

  const handleSend = () => {
    // Trigger isSending
    setIsSending(true)
    // Try to send the message
    SendFlowTestMessage(flowId, message!)
      .then((res) => {
        (document.getElementById("message") as HTMLInputElement).value = ""
        setMessage(undefined)
        // Clean isSending
        setIsSending(false)
        // Triger refresh
        setRefresh && setRefresh(-1)
      })
  }

  // This process will simulate a socket.
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (refresh == -1) {
      timer = setTimeout(() => setRefresh(refresh + 1), 1)
    } else {
      timer = setTimeout(() => setRefresh(refresh + 1), 1e4)
    }
    return () => clearTimeout(timer)
  }, [refresh])

  useEffect(() => {
    if (isMounted && flowId) {
      getChat(flowId, setData)
    }
  }, [isMounted, flowId, refresh])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (<LoaderSpiner />)
  } else {
    return (
      <div className="p-5 flex flex-col gap-3 w-full h-full">
        <div className='flex flex-col gap-4 m-auto shadow-lg w-[80%] max-h-[70vh] h-[70vh] overflow-y-auto'>
          {
            data ? (
              data.length > 0 ? (
                data.map((element: IFlowChat, index) => {
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
                  <p className='m-auto'>No hay elementos en el chat...</p>
                </div>
              )
            ) : (
              <LoaderSpiner />
            )
          }
        </div>
        <div className='flex flex-row gap-2 w-[80%] m-auto'>
          <Textarea
            placeholder='Escribe tu mensaje aqui...'
            disabled={isSendig}
            id='message'
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            className='w-32 h-20'
            disabled={isSendig}
            onClick={() => handleSend()}
          >
            Enviar
          </Button>
          <Button
            className='w-32 h-20'
            disabled={isSendig}
            onClick={() => {
              DeleteFlowChat(flowId)
              setRefresh && setRefresh(-1)
            }}
          >
            Eliminar
          </Button>
        </div>
      </div>
    )
  }
}

export default FlowTestChat