import React from 'react'
import {motion,AnimatePresence} from "framer-motion"
const Navbar = () => {
  return (
    <AnimatePresence>
    <motion.div
        layout 
        variants={{
          hidden:{opacity:0,y:-30},
          visible:{opacity:1,y:0}
        }}
        initial="hidden"
        animate="visible"
        transition={{duration:0.7,delay:0.35}}
     className='bg-[#111] fixed top-0 flex flex-row justify-between items-center h-[49px] px-9 w-full z-[999]'
    style={{backdropFilter: "blur(24px)",backgroundColor:"rgba(45,45,45,.4)",borderBottom: "1px solid rgba(255, 255, 255, 0.16)"}}>
      <div className='text-white expensive_f tracking-[4.4px]'>
        Abdullah
      </div>
      <div className='flex flex-row gap-3 transition-all max-sm:hidden'>
        <a href='#home' className='text-[#c7c7c7] t py-[3px] px-[20px] flex justify-center items-center
        rounded-[3px] uppercase cursor-pointer text-[14px]'>
            Home
        </a>
        <a href='#projects' className='text-[#c7c7c7] t py-[3px] px-[20px] flex justify-center items-center
        rounded-[3px] uppercase cursor-pointer text-[14px]'>
            Projects
        </a>
        <a href='#about' className='text-[#c7c7c7] t py-[3px] px-[20px] flex justify-center items-center
        rounded-[3px] uppercase cursor-pointer text-[14px]'>
            About
        </a>
      </div>
    </motion.div>
    </AnimatePresence>
  )
}

export default Navbar
// saturate(180%) blur(20px)