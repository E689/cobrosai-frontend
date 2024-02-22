// React Imports
import React from 'react'
import { useRouter } from 'next/navigation';

// Icons imports
import { BsReceiptCutoff } from "react-icons/bs";
import { RiContactsBook2Line, RiLogoutBoxRLine } from "react-icons/ri";
import { TiFlowSwitch } from "react-icons/ti";
import { FaChevronLeft } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

// ShadCN imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Interface imports
import { IAuthFormProps } from '@/app/types/types';
import AuthForm from './AuthForm';

const SignOutDialog = () => {
  // Router
  const router = useRouter()

  const AUTH_FORM_PROPS: IAuthFormProps = {
    submitText: "Cerrar Sesión",
    formType: "signout"
  }
  
  return (
    <Dialog>
      <DialogTrigger className='w-full h-full'>
        <RiLogoutBoxRLine className='w-full h-full' />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className='m-auto'>
          <DialogTitle>Desea cerrar sesión?</DialogTitle>
        </DialogHeader>
        <AuthForm
          submitText={AUTH_FORM_PROPS.submitText}
          formType={AUTH_FORM_PROPS.formType}
        />
      </DialogContent>
    </Dialog>
  )
}

const NavBar = () => {
  const router = useRouter()

  return (
    <nav className='absolute w-screen h-[5vh] bg-slate-100 dark:bg-blue-950/60 shadow-lg px-4 flex flex-row gap-4'>
      <div
        className='h-full hover:cursor-pointer p-2 mr-10'
        onClick={() => router.back()}
      >
        <FaChevronLeft className='w-full h-full' />
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
      <div
        className='h-full grow flex flex-row-reverse'
      >
        <div
          className='h-full hover:cursor-pointer p-2'
        >
          <SignOutDialog />
        </div>
        <div
          className='h-full hover:cursor-pointer p-2'
          onClick={() => router.push("/dashboard/profile")}
        >
          <CgProfile className='w-full h-full' />
        </div>
      </div>
    </nav>
  )
}

export default NavBar