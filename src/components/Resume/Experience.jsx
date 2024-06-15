import React from 'react'
import { CornerUpRight, Briefcase } from 'lucide-react';

const Experience = ({data}) => {
  return (
    <div className='flex flex-col mt-5'>
        <div className='text-xl font-bold flex items-center gap-2'>
            <span className='border-2 border-[#414652] p-1 rounded-md'>
                <Briefcase size={'20px'} />
            </span>
            <span>Work Experience</span>
        </div>
            {data?.experience?.map((item, index) => (
                <div className='flex flex-row mt-2 gap-2' key={index}>
                    <div className='mt-1'>
                        <CornerUpRight size={'13px'} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <div className='flex gap-2'>
                            <div className='font-semibold'>{item?.title}</div>
                            <div className='font-mono bg-[#F3F4F6] px-2 py-1 text-xs rounded-md font-extrabold text-[#414652]'>
                                {item?.site}
                            </div>
                        </div>
                        <div className='font-mono text-sm leading-none mt-1 font-bold'>
                            {item?.company}
                        </div>
                        <div className='text-[#666666] text-xs font-mono mt-2 font-bold'>
                            {item?.description?.map((val,index) => (
                                <div key={index}>- {val}</div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
    </div>
  )
}

export default Experience
