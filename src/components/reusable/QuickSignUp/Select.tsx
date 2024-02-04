import { IDropZoneProps } from '@/app/types/types'
import { Button } from '@/components/ui/button'
import DropZoneFile from '@/components/reusable/DropZoneFile'
import { ChangeEvent } from 'react'

const Select = ({ setFile, setStep }: IDropZoneProps) => {

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    }

    setFile(target.files[0])
  }

  return (
    <div className='w-[100%] h-screen flex flex-col py-10'>
      <DropZoneFile setFile={setFile} setStep={setStep} />
      <div className='w-[25%] h-5 flex flex-row gap-8 mx-auto my-3'>
        <div className='grow h-[2px] bg-slate-400 m-auto' />
        <p className='m-auto'>O</p>
        <div className='grow h-[2px] bg-slate-400 m-auto' />
      </div>
      <div className='w-[20%] h-[10%] flex mx-auto my-3'>
        <Button
          className='w-full h-full text-md lg:text-lg xl:text-xl'
          onClick={() => document.getElementById('billFile')?.click()}
        >
          Seleccionar Archivo
        </Button>
        <input hidden={true} id="billFile" type="file" onChange={handleOnChange} accept='application/*' />
      </div>
      <div className='w-[25%] h-5 flex flex-row gap-8 mx-auto my-3'>
        <div className='grow h-[2px] bg-slate-400 m-auto' />
        <p className='m-auto'>O</p>
        <div className='grow h-[2px] bg-slate-400 m-auto' />
      </div>
      <div className='w-[20%] h-[10%] flex mx-auto my-3'>

        <Button
          className='w-full h-full text-md lg:text-lg xl:text-xl'
          onClick={() => setStep("billForm")}
        >
          Ingreso Manual
        </Button>
      </div>
    </div>
  )
}

export default Select