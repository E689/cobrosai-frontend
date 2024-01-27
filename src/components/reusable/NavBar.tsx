import React from 'react'
import { BsReceiptCutoff } from "react-icons/bs";
import { RiContactsBook2Line } from "react-icons/ri";
import { TiFlowSwitch } from "react-icons/ti";

const NavBar = () => {
  return (
    <nav className='absolute w-screen h-10 bg-slate-400/60 dark:bg-blue-950/50 shadow-lg px-24 flex flex-row gap-4'>
      <div>
        <BsReceiptCutoff />
      </div>
      <div>
        <RiContactsBook2Line />
      </div>
      <div>
        <TiFlowSwitch />
      </div>
    </nav>
  )
}

export default NavBar