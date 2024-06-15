import React from 'react'
import { Computer, ArrowUpRight } from 'lucide-react';

const Projects = ({data}) => {
  return (
    <div className='flex flex-col mt-5'>
        <div className='text-xl font-bold flex items-center gap-2'>
            <span className='border-2 border-[#414652] p-1 rounded-md'>
                <Computer size={'20px'} />
            </span>
            <span>
                Projects
            </span>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 mt-3'>
            {data?.projects?.map((item, index) => (
                <div className='flex flex-col border px-3 py-1 rounded-lg shadow' key={index}>
                    <div className='font-semibold tracking-tight text-base'>
                        <a href={`${item?.link}`} className='underline' target='_blank'>{item?.name}</a>
                    </div>
                    <div className='text-[#333] text-xs font-mono mt-2 font-extrabold'>
                        {item?.description?.map((val,index) => (
                            <div key={index}>- {val}</div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Projects
