// This component is for the Loading screen when API fetches the data
import React from 'react'

function Spinner() {
  return (
    <div className='flex flex-col items-center gap-y-2'>
        
        {/* div to create a circle */}
        <div className='spinner'></div>
        <p className='text-bgDark text-lg font-semibold'>Loading....</p>

    </div>
  )
}

export default Spinner
