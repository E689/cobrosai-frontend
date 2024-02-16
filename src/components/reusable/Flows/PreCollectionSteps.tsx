import React, { useEffect, useState } from 'react'

import { IFlowParams, IFlowPreCollection } from '@/app/types/types'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from "@/components/ui/select"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"

interface IPrecollectionSteps {
  preCollection: IFlowPreCollection[] | undefined,
  setPreCollectionData: Function
}

const newCollection: IFlowPreCollection = {
  days: 0,
  actionTime: "string",
  channel: "string",
  instruction: "string"
}

const PreCollectionSteps = ({ preCollection, setPreCollectionData }: IPrecollectionSteps) => {
  const [isMounted, setIsMounted] = useState<Boolean>(false)

  useEffect(() => {
    setIsMounted(true)
    setPreCollectionData(preCollection)
  }, [preCollection, setPreCollectionData])

  if (!isMounted) {
    return (<></>)
  } else {
    return (
      <div className="flex flex-col gap-8">
        {
          preCollection ? (
            preCollection.map((value: IFlowPreCollection, index) => {
              return (
                <div className='flex flex-col gap-2 bg-slate-100 dark:bg-blue-950/60 rounded-lg shadow-md py-4 px-2' key={index}>
                  <Button
                    className='ml-auto'
                    onClick={(e) => {
                      let run = 0
                      setPreCollectionData((prevState: IFlowPreCollection[]) => {
                        let data = Object.assign({}, prevState!)

                        if (run == 0) {
                          preCollection.splice(index, 1)
                          delete data[index]
                        }
                        run++
                        return data
                      })
                    }}
                  >
                    Eliminar
                  </Button>
                  <div className='flex flex-row gap-2 mx-auto'>
                    <p className='uppercase my-auto'>Mandar primer mensaje</p>
                    <Input
                      type='number'
                      value={value.days}
                      onChange={(e) => {
                        setPreCollectionData((prevState: IFlowPreCollection[]) => {
                          let data = Object.assign({}, prevState!)
                          data[index].days = Number(e.target.value)
                          return data
                        })
                      }
                      }
                      className='w-fit'
                    >
                    </Input>
                    <p className='my-auto'> días </p>
                    <ActionSelect
                      value={value.actionTime}
                      setPreCollectionData={setPreCollectionData}
                      index={index}
                    />
                    <p className='my-auto'> de la fecha de cobro, por medio de </p>
                    <ActionSelect
                      value={value.channel}
                      setPreCollectionData={setPreCollectionData}
                      index={index}
                    />
                  </div>
                  <div>
                    <Input
                      type='text'
                      value={value.instruction}
                      onChange={(e) => setPreCollectionData((prevState: IFlowPreCollection[]) => {
                        let data = Object.assign({}, prevState!)
                        data[index].instruction = e.target.value
                        return data
                      })}
                      className='w-full'
                    >
                    </Input>
                  </div>
                </div>
              )
            })
          ) : (<></>)
        }
        <Button
          className='w-[30%] mx-auto'
          onClick={() => {
            let run = 0
            setPreCollectionData((prevState: IFlowPreCollection[]) => {
              let data = Object.assign({}, prevState!)

              if (run == 0) {
                data[preCollection!.length] = newCollection
                preCollection?.push(newCollection)
              }
              run++
              return data
            })
          }}
        >
          Agregar
        </Button>
      </div>
    )
  }
}


interface IActionSelect {
  value: string,
  setPreCollectionData: Function,
  index: number
}

const ActionSelect = ({ value, setPreCollectionData, index }: IActionSelect) => {
  return (
    <Select
      onValueChange={(e) => setPreCollectionData((prevState: IFlowPreCollection[] | undefined) => {
        let data = Object.assign({}, prevState!)
        data[index].actionTime = (e as "antes" | "despues" | "email" | "whatsapp")
        
        return data
      })

      }
      defaultValue={value}>
      <SelectTrigger className="w-[180px]">
        {value}
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="antes">Antes</SelectItem>
        <SelectItem value="despues">Despues</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default PreCollectionSteps
