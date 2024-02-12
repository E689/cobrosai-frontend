import React from 'react'
import { useRouter } from 'next/navigation';
import { TbMessageSearch } from 'react-icons/tb';

const ClientDetailButton = ({clientId}: {clientId: string}) => {
  const router = useRouter()

  return (
    <TbMessageSearch
      size={20}
      className="m-auto cursor-pointer"
      onClick={() => router.push(`/dashboard/clients/${clientId}`)}
    />
  )
}

export default ClientDetailButton