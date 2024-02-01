import React from 'react'
import { Github,ExternalLink  } from 'lucide-react';
import {motion} from "framer-motion"
import ProjectCard from './ProjectCard';
const Projects = () => {
  return (
    <div className='mb-10'id='projects'>
      <div className='flex flex-col'>
        <motion.div
            layout
            initial={{opacity:0,y:30,}}
            whileInView={{opacity:1,y:0}}
            animate="visible"
            transition={{duration:0.5,delay:0.25}}
            viewport={{ once: true }} 
            className='text-[#c7c7c7] text-[28px] mb-5'>
            Projects
        </motion.div>
        <div className='grid grid-cols-3 gap-3 max-sm:grid-cols-1'>
            <ProjectCard
                img="/images/twitter_clone.png"
                projectName="TwitterClone"
                githubRepo="https://github.com/abdullahsajid/twitterCloneFrontend"
                link="https://twitterclonefrontend.onrender.com/"
                skills={['React js','Redux toolkit','TailwindCss','Socket','Node js','Express js','Mongo DB']}
            />
            <ProjectCard
                img="/images/bms.png"
                projectName="Bakery Management"
                githubRepo="https://github.com/abdullahsajid/bakerymanagementsystem"
                skills={['Php','Laravel','Bootstrap']}
            />
            <ProjectCard
                img="/images/movieland.png"
                projectName="Movieland"
                githubRepo="https://github.com/abdullahsajid/movieland"
                skills={['React js','Apis','CSS3']}
            />
        </div>
      </div>
    </div>
  )
}

export default Projects
