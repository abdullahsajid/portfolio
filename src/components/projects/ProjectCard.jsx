import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"
import { Github,ExternalLink  } from 'lucide-react';
import Skills from './Skills';
import ProjectImage from './ProjectImage';

const ProjectCard = ({img,projectName,githubRepo,link,skills,hash}) => {
    
  return (
            <motion.div 
                layout
                initial={{opacity:0,y:50,}}
                whileInView={{opacity:1,y:0}}
                animate="visible"
                transition={{duration:0.5,delay:0.25}}
                viewport={{ once: true }}
                className='flex flex-col p-5 project_card shadow-lg rounded'>
                <ProjectImage img={img}/>
                <div className='flex flex-row items-center justify-between mt-5'>
                    <div className='text-white expensive_f '>{projectName}</div>
                    <div className='flex flex-row gap-3'>
                        <a href={githubRepo}>
                            <Github color='#fff'/>
                        </a>
                        {link &&
                        <a href={link}>
                            <ExternalLink color='#fff'/>
                        </a>}
                    </div>
                </div>
                <Skills skill={skills}/>
            </motion.div>
  )
}

export default ProjectCard
