import React, { useEffect, useState } from 'react'

import { IFlowCollectionIgnore, IFlowCollectionPaymentConfirmation, IFlowCollectionPaymentDelay, IFlowParams, IFlowPreCollection } from '@/app/types/types'
import { Button } from '@/components/ui/button'
import PreCollectionSteps from './PreCollectionSteps'
import CollectionSteps from './CollectionSteps'

const Collection = ({
  name,
  flowId
}: IFlowParams) => {
  
  const handleOnClick = () => {
    // TODO: Update current flow
    console.log("Actualizando el flujo...")
    
  }

  return (
    <div className='flex flex-col gap-8 w-full p-4'>
      <p className='text-xl uppercase'>Flujo {name}:</p>
    </div>
  )
}

export default Collection