import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col items-center justify-center mb-3'>
        <div className='text-xs text-[#8e8e8e]'>Copyright {new Date().getFullYear()} © Abdullah Sajid</div>
        <div className='text-xs text-[#8e8e8e] text-[10px]'>abdullahsajid521@gmail.com</div>
    </div>
  )
}

export default Footer
