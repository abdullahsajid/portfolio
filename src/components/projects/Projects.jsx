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
                img="/images/techlinkhub.png"
                projectName="Techlinkhub"
                githubRepo="https://github.com/abdullahsajid/tlhfrontend"
                link="https://tlhfrontend.vercel.app/"
                skills={["React.js", "Redux Toolkit", "React Query", "Socket io", "Tailwind CSS",
                  "Node.js", "Express.js", "Python", "Flask", "Scikit-learn", "Socket io", "Stripe","MySQL"
                ]}
            />
            <ProjectCard
                img="/images/bms.png"
                projectName="Bakery Management"
                githubRepo="https://github.com/abdullahsajid/bakerymanagementsystem"
                skills={['Php','Laravel','Bootstrap']}
            />
        </div>
      </div>
    </div>
  )
}

export default Projects
