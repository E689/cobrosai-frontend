import { IAIStatsProps } from '@/app/types/types';
import React from 'react'
import { FaCoins } from "react-icons/fa";

const AIStats = ({automatedQty, automatedMax}: IAIStatsProps) => {

  const automatedPercentage = ((100 * automatedQty) / automatedMax)
  let percentageClassName = "m-auto font-bold text-sm "

  if (automatedPercentage >= 0 && automatedPercentage < 25) percentageClassName += "text-red-400"
  if (automatedPercentage >= 25 && automatedPercentage < 50) percentageClassName += "text-orange-400"
  if (automatedPercentage >= 50 && automatedPercentage < 75) percentageClassName += "text-yellow-400"
  if (automatedPercentage >= 75 ) percentageClassName += "text-green-400"

  return (
    <div className='w-full h-full rounded-md shadow-lg flex flex-row gap-4 p-4 bg-slate-100 dark:bg-blue-950/60'>
      <div className='flex flex-col grow'>
        <div className='flex mt-auto'>
          <p className='m-auto text-sm'>Facturas Automatizadas </p>
        </div>
        <div className='flex mb-auto'>
          <p className={percentageClassName}>{`${automatedQty} / ${automatedMax} - ${automatedPercentage.toFixed(0)}%`}</p>
        </div>
      </div>
      <div className='flex w-10 h-10 m-auto'>
        <FaCoins className='w-full h-full m-auto' />
      </div>
    </div>
  )
}

export default AIStats