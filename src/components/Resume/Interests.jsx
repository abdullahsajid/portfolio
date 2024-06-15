import React from 'react'
import { CandlestickChart } from 'lucide-react';

const Interests = ({data}) => {
  return (
    <div className='flex flex-col mt-5 border-2 py-2 px-3 rounded-lg shadow'>
        <div className='text-xl font-bold flex items-center gap-2'>
            <span className='border-2 border-[#414652] p-1 rounded-md'>
                <CandlestickChart size={'20px'} />
            </span>
            <span>
                Interests
            </span>
        </div>
        <div className='flex flex-wrap gap-2 mt-3'>
            {data?.Interests?.map((item, index) => (
                <div className='font-mono bg-[#F3F4F6] px-2 py-1 text-xs rounded-md font-extrabold text-[#414652]' key={index}>
                    {item}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Interests
