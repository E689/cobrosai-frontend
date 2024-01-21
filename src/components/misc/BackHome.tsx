import Link from 'next/link'
import React from 'react'

const BackHome = () => {
  return (
    <div className="fixed left-5 top-5 w-fit overflow-hidden">
      <Link href={'/'}>
        {`< Inicio`}
      </Link>
    </div>
  )
}

export default BackHome