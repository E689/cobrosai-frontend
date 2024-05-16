'use client'

import { IFlowChat } from '@/app/types/types'
import LoaderSpiner from '@/components/reusable/LoaderSpiner'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { SendFlowTestMessage } from '@/lib/flowCalls'
import React, { useEffect, useState } from 'react'

const FlowTestChat = ({ flowId, token }: { flowId: number, token: string }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [isSendig, setIsSending] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [chat, setChat] = useState<IFlowChat[]>([])

  const handleSend = () => {
    // Trigger isSending
    setIsSending(true);
    // Add user mesage to log
    setChat(oldState => [
      ...oldState,
      {
        role: 'user',
        respuesta_al_usuario: message,
      }
    ]);
    // Try to send the message
    SendFlowTestMessage(flowId, message, token)
      .then((res) => {
        (document.getElementById("message") as HTMLInputElement).value = "";
        setMessage("");
        setIsSending(false);
        setChat(oldState => [...oldState, res]);
      })
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (<LoaderSpiner />)
  } else {
    return (
      <div className="p-5 flex flex-col gap-3 w-full h-full">
        <div className='flex flex-col gap-4 m-auto h-[70vh] w-full px-2 rounded-lg overflow-y-auto bg-slate-100/30 dark:bg-blue-950/30'>
          {
            chat ? (
              chat.length > 0 ? (
                chat.map((element: IFlowChat, index) => {
                  let msgAlignClass = ""

                  switch (element.role) {
                    case "system":
                      msgAlignClass = "bg-indigo-500 mx-auto"
                      break;
                    case "user":
                      msgAlignClass = "bg-emerald-500 ml-auto"
                      break;
                    default:
                      msgAlignClass = "bg-slate-300 mx-auto"
                      break;
                  }

                  return (
                    <div
                      key={index}
                    >
                      <div
                        className={`flex flex-col px-2 py-1 ${msgAlignClass} rounded-lg max-w-[90%]`}
                      >
                        <p className='text-md whitespace-pre-wrap break-words'>{element.respuesta_al_usuario}</p>
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
        <div className='flex flex-row gap-2 w-[90%] m-auto'>
          <Textarea
            className='w-full'
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
              setChat([])
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