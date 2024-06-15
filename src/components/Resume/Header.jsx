import React from 'react'
import { Home, Mail, Phone } from 'lucide-react';

const Header = ({data}) => {
  return (
        <div className='flex items-start justify-between max-sm:flex-col-reverse max-sm:gap-3'>
            <div className='flex-1'>
                <div className='text-3xl font-bold font-mono'>{data?.name}</div>
                <div className='text-[#666666] text-sm font-bold font-mono mt-2'>{data?.title}</div>
                <div className='text-[#666666] text-sm font-bold font-mono mt-1'>{data?.description}</div>
                <div className='text-[#666666] text-sm font-mono flex items-center gap-2 mt-1 font-bold'>
                    <Home size={'13px'} /> {data?.address}
                </div>
                <div className='flex gap-2 items-center mt-3'>
                    <a href={`mailto:${data?.email}`} className='text-[#666666] text-sm font-mono border-2 p-1 rounded-md'>
                        <Mail size={'15px'} className='text-[#666666]' />
                    </a>
                    <a href={`tel:+${data?.phone}`} className='text-[#666666] text-sm font-mono border-2 p-1 rounded-md'>
                        <Phone size={'15px'} className='text-[#666666]' />
                    </a>
                </div>
                <div className='flex gap-2 items-center mt-3'>
                    <a href='https://github.com/abdullahsajid/' className='flex items-center justify-center w-[35px]'>
                        <img src="/images/github.png" alt="" />
                    </a>
                    <a href='https://www.linkedin.com/in/aabdullahsajid/' className='flex items-center justify-center w-[35px]' >
                        <img src="/images/linkedin.png" alt="" />
                    </a>
                    <a href='https://twitter.com/aabdullahsajid' className='flex items-center justify-center w-[42px]' >
                        <img src="/images/twitterr.png" alt="" />
                    </a>
                </div>
            </div>
            {<div className='relative flex shrink-0 overflow-hidden rounded-xl w-[7rem] h-[7rem]'>
                <img src={`${data?.avatar}`} className='aspect-square h-full w-full' />
            </div>}
        </div>
  )
}

export default Header

