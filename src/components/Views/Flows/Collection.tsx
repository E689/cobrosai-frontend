import React from 'react'

import { 
  ICreateFlowFormParams
} from '@/app/types/types'
import CreateFlowForm from './CreateFlowForm'

const Collection = ({
  userId,
  action,
  flowId
}: ICreateFlowFormParams) => {

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