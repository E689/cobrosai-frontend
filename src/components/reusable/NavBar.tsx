import React from 'react'
import { useRouter } from 'next/navigation';

import { BsReceiptCutoff } from "react-icons/bs";
import { RiContactsBook2Line } from "react-icons/ri";
import { TiFlowSwitch } from "react-icons/ti";
import { FaChevronLeft } from "react-icons/fa";


const NavBar = () => {
  const router = useRouter()

  return (
    <nav className='absolute w-screen h-[5vh] bg-slate-100 dark:bg-blue-950/60 shadow-lg px-4 flex flex-row gap-4'>
      <div
        className='h-full hover:cursor-pointer p-2 mr-10'
        onClick={() => router.back()}
      >
        <FaChevronLeft  className='w-full h-full' />
      </div>
      <div
        className='h-full hover:cursor-pointer p-2'
        onClick={() => router.push("/dashboard/bills")}
      >
        <BsReceiptCutoff className='w-full h-full' />
      </div>
      <div
        className='h-full hover:cursor-pointer p-2'
        onClick={() => router.push("/dashboard/clients")}
      >
        <RiContactsBook2Line className='w-full h-full' />
      </div>
      <div
        className='h-full hover:cursor-pointer p-2'
        onClick={() => router.push("/dashboard/flows")}
      >
        <TiFlowSwitch className='w-full h-full' />
      </div>
    </nav>
  )
}

export default NavBar