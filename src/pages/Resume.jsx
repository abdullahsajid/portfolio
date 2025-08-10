import React, { lazy } from 'react'
import resumeData from '../utils/data.json'
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
const Header = lazy(() => import('../components/Resume/Header'))
const Skills = lazy(() => import('../components/Resume/Skills'))
const Experience = lazy(() => import('../components/Resume/Experience'))
const Education = lazy(() => import('../components/Resume/Education'))
const Projects = lazy(() => import('../components/Resume/Projects'))
const Certificate = lazy(() => import('../components/Resume/Certificate'))
const Language = lazy(() => import('../components/Resume/Language'))
const Interests = lazy(() => import('../components/Resume/Interests'))

const Resume = () => {
  return (
    <div className='relative p-16 bg-resume max-sm:p-8'>
      <div className='flex justify-between'>
        <Link to={'/'} className='bg-[#fff] inline-block p-1 rounded-md max-sm:mb-3'>
          <ArrowLeft/>
        </Link>
        <Link to={'https://olwasftxn3b3qkl6.public.blob.vercel-storage.com/update-resume.pdf'}
          className='bg-[#fff] inline-block p-1 rounded-md max-sm:mb-3'
          target='_blank' rel='noopener noreferrer'
        >
          <Download />
        </Link>
      </div>
        <div className='mx-auto max-w-3xl border-2 p-3 shadow-lg rounded-md bg-tone'>
          <Header data={resumeData} />
          <Skills data={resumeData}/>
          <Experience data={resumeData} />
          <Education data={resumeData}  />
          <Projects data={resumeData}  />
          <Certificate data={resumeData}  />
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-2'>
            <Language data={resumeData}  />
            <Interests data={resumeData} />
          </div>
        </div>
    </div>
  )
}

export default Resume
