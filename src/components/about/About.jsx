import React from 'react';
import {motion} from "framer-motion"
const About = () => {

  return (
    <div className='my-20' id='about'>
        <div className='grid grid-cols-2  max-sm:grid-cols-1 items-center max-sm:gap-5'>
            <div className='flex flex-col gap-3 max-sm:order-last'>
                <motion.div
                    layout
                    initial={{opacity:0,y:30,}}
                    whileInView={{opacity:1,y:0}}
                    animate="visible"
                    transition={{duration:0.5,delay:0.25}}
                    viewport={{ once: true }} 
                    className='text-[#c7c7c7] text-[28px]'>
                    About Me
                </motion.div>
                <motion.div 
                    layout
                    initial={{opacity:0,y:50,}}
                    whileInView={{opacity:1,y:0}}
                    animate="visible"
                    transition={{duration:0.5,delay:0.25}}
                    viewport={{ once: true }}
                    className='text-[#8e8e8e] leading-7'>
                    I possess a well-rounded skill set gained through hands-on experience in practice and freelance
                    projects, mainly using the MERN stack. My coursework has included the development of
                    various software in different programming languages like HTML, CSS, JavaScript, ReactJS, Java, and C++. I completed a Responsive Web Design course at FreeCodeCamp. My expertise
                    extends to crafting user-friendly interfaces and dynamic web applications with ReactJS. Whether working on the front-end or back-end, I bring a collaborative approach to meet client
                    requirements. I am eager to contribute my skills to challenging projects and continue advancing
                    in the field of information technology.
                </motion.div>
            </div>
            <div className='flex items-center justify-center auth_img max-sm:order-first'>
                <motion.div 
                    layout
                    initial={{opacity:0,y:50,}}
                    whileInView={{opacity:1,y:0}}
                    animate="visible"
                    transition={{duration:0.5,delay:0.25}}
                    viewport={{ once: true }}
                    className='outliner'>
                    <img src="/images/bg-black.jpg" 
                        className='object-cover h-[300px] max-sm:w-[200px] max-sm:h-[200px] author_img '
                        alt="Abdullah sajid" />
                </motion.div>
            </div>
        </div>
    </div>
  )
}

export default About
