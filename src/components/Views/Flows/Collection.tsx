import React, { useEffect, useState } from 'react'

import { 
  ICreateFlowFormParams,
  IFlowParams
} from '@/app/types/types'
import CreateFlowForm from './CreateFlowForm'

const Collection = ({
  userId,
  action,
  flowId
}: ICreateFlowFormParams) => {

  const handleOnClick = () => {
    // TODO: Update current flow
    console.log("Actualizando el flujo...")
    
  }

  return (
    <div className='flex w-full max-h-screen overflow-y-auto p-4'>
      <CreateFlowForm 
        userId={userId}
        action={action}
        flowId={flowId}
      />
    </div>
  )
}

export default Collection