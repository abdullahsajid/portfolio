import React from 'react'
import { CornerUpRight, School } from 'lucide-react';

const Education = ({data}) => {
  return (
    <div className='flex flex-col mt-5'>
        <div className='text-xl font-bold flex items-center gap-2'>
            <span className='border-2 border-[#414652] p-1 rounded-md'>
                <School size={'20px'} />
            </span>
            <span>Education</span>
        </div>
        {data?.education?.map((item, index) => (
            <div className='flex flex-row mt-3 gap-2' key={index}>
                <div className='mt-1'>
                    <CornerUpRight size={'13px'} />
                </div>
                <div className='flex flex-col gap-2'>
                    <div className='font-semibold leading-none'>{item?.institute}</div>
                    <div className='font-mono text-sm leading-none font-bold'>{item?.domain}</div>
                    <div className='font-mono text-sm text-[#666666] font-bold'>{item?.description}</div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Education
