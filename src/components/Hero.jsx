import React from 'react'
import {motion,AnimatePresence} from "framer-motion"
const Hero = () => {

  return (
    <AnimatePresence>
    <div className='pb-12 cyberpunk pl-[1px]' id='home'>
        <div
         className='flex flex-col h-max lg:w-max sm:w-full md:w-full hero pb-3'>
            <motion.div
                layout
                initial={{opacity:0,y:30,}}
                whileInView={{opacity:1,y:0}}
                animate="visible"
                transition={{duration:0.5,delay:0.25}}
                viewport={{ once: true }}
            className='text-[#a2a3a5] starter_head px-[23px]'>
                Hey there, I'm
            </motion.div>
            <motion.div 
                initial={{opacity:0,y:50}}
                whileInView={{opacity:1,y:0}}
                animate="visible"
                transition={{duration:0.5,delay:0.25}}
                viewport={{ once: true }}
                className='text-white font-extrabold author_name px-[23px]'>
                Abdullah Sajid
            </motion.div>
            <motion.div
                 initial={{opacity:0,y:70}}
                 whileInView={{opacity:1,y:0}}
                 animate="visible"
                 transition={{duration:0.5,delay:0.25}}
                 viewport={{ once: true }}
                className='quote px-[23px]'>
                <span className='text-white font-extrabold'>Software Engineer. </span>
                <span className='text-[#a2a3a5]'>
                    Full Stack developer focuses <br /> on building products to solve problems. 
                </span>
            </motion.div>
            <motion.div 
                initial={{opacity:0,y:80}}
                whileInView={{opacity:1,y:0}}
                animate="visible"
                transition={{duration:0.5,delay:0.25}}
                viewport={{ once: true }}
                className='flex flex-row gap-3 mt-5 px-[23px]'>
                <a href='https://github.com/abdullahsajid/' className='flex items-center justify-center w-[35px]'>
                    <img src="/images/github.png" alt="" />
                </a>
                <a href='https://www.linkedin.com/in/aabdullahsajid/' className='flex items-center justify-center w-[35px]' >
                    <img src="/images/linkedin.png" alt="" />
                </a>
                <a href='https://twitter.com/aabdullahsajid' className='flex items-center justify-center w-[42px]' >
                    <img src="/images/twitterr.png" alt="" />
                </a>
            </motion.div>
        </div>
    </div>
    </AnimatePresence>
  )
}

export default Hero
