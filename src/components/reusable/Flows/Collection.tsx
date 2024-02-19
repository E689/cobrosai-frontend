import React, { useEffect, useState } from 'react'

import { IFlowCollectionIgnore, IFlowCollectionPaymentConfirmation, IFlowCollectionPaymentDelay, IFlowParams, IFlowPreCollection } from '@/app/types/types'
import { Button } from '@/components/ui/button'
import PreCollectionSteps from './PreCollectionSteps'
import CollectionSteps from './CollectionSteps'

const Collection = ({
  name,
  id
}: IFlowParams) => {
  const [preCollectionData, setPreCollectionData] = useState<IFlowPreCollection[] | undefined>(undefined)
  const [paymentConfirmationData, setPaymentConfirmationData] = useState<IFlowCollectionPaymentConfirmation | undefined>(undefined)
  const [paymentDelayData, setPaymentDelayData] = useState<IFlowCollectionPaymentDelay | undefined>(undefined)
  const [collectionIgnoredData, setCollectionIgnoredData] = useState<IFlowCollectionIgnore | undefined>(undefined)

  const handleOnClick = () => {
    // TODO: Update current flow
    console.log("Actualizando el flujo...")
    console.log(
      "preCollection -> ", preCollectionData,
      "paymentConfirmation -> ", paymentConfirmationData,
      "paymentDelay -> ", paymentDelayData,
      "collectionIgnored -> ", collectionIgnoredData,
    )
  }

  return (
    <div className='flex flex-col gap-8 w-full p-4'>
      <p className='text-xl uppercase'>Flujo {name}:</p>
      <PreCollectionSteps
        preCollection={preCollection}
        setPreCollectionData={setPreCollectionData}
      />
      <CollectionSteps
        paymentConfirmation={paymentConfirmationData}
        setPaymentConfirmationData={setPaymentConfirmationData}
        paymentDelay={paymentDelayData}
        setPaymentDelayData={setPaymentDelayData}
        collectionIgnored={collectionIgnoredData}
        setCollectionIgnoredData={setCollectionIgnoredData}
      />
      <Button
        disabled={preCollectionData == preCollection}
        onClick={handleOnClick}
      >
        Guardar cambios
      </Button>
    </div>
  )
}

export default Collection