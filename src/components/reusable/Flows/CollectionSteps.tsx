import React from 'react'

import { 
  IFlowCollectionPaymentConfirmation, 
  IFlowCollectionPaymentDelay, 
  IFlowCollectionIgnore 
} from '@/app/types/types'

interface ICollectionSteps {
  paymentConfirmation: IFlowCollectionPaymentConfirmation  | undefined,
  setPaymentConfirmationData: Function,
  paymentDelay: IFlowCollectionPaymentDelay  | undefined,
  setPaymentDelayData: Function,
  collectionIgnored: IFlowCollectionIgnore  | undefined,
  setCollectionIgnoredData: Function
}

const CollectionSteps = ({
  paymentConfirmation, 
  setPaymentConfirmationData,
  paymentDelay, 
  setPaymentDelayData,
  collectionIgnored,
  setCollectionIgnoredData
}: ICollectionSteps) => {
  return (
    <div className='flex flex-row gap-2 w-full'>
      <div className='flex flex-col w-full'>
        test
      </div>
      <div className='flex flex-col w-full'>
        test
      </div>
      <div className='flex flex-col w-full'>
        test
      </div>
    </div>
  )
}

export default CollectionSteps