import React from 'react'
import { Library } from 'lucide-react';

const Skills = ({data}) => {
  return (
    <div className='flex flex-col mt-5'>
            <div className='text-xl font-bold flex items-center gap-2'>
                <span className='border-2 border-[#414652] p-1 rounded-md'>
                    <Library size={'20px'} />
                </span>
                <span>
                    Skills
                </span>
            </div>
            <div className='flex flex-wrap gap-1 mt-3'>
                {data?.skills?.map((item, index) => (
                     <div className='bg-[#414652] text-[#fff] p-1 rounded-md text-xs font-mono' key={index}>
                        {item}
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Skills
