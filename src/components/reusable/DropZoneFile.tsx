'use client'

import React, { ChangeEvent, useEffect } from 'react'
import { IDropZoneProps } from '@/app/types/types'
import { IoCloudUploadOutline } from "react-icons/io5";

const DropZoneFile = ({ setFile }: IDropZoneProps) => {

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
  }, [setFile])

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }

    setFile(target.files[0])
  }

  return (
    <div className="grid w-full h-full p-2 max-h-[60vh]">
      <label 
        htmlFor="billFile" 
        className='grid w-full h-full bg-slate-400/60 dark:bg-blue-950/50 text-center 
          rounded-lg border-4 border-dashed border-black/50 dark:border-white/50
          gap-0 justify-center'
        id='dropArea'
      >
        <input hidden={true} id="billFile" type="file" onChange={handleOnChange} accept='application/*'/>
        <IoCloudUploadOutline className='text-[20vh] md:text-[40vh] m-auto'/>
        <p className='text-[3vh] md:text-[4vh] font-bold'>Haz click o suelta un archivo en esta zona para iniciar.</p>
        <span className='text-[1vh] md:text-[3vh] text-black/60'>Puedes descargar el archivo .xlx desde tu Portal SAT.</span>
      </label>
    </div>
  )
}

export default DropZoneFile